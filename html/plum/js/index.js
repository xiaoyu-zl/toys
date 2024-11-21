import { initCanvas, polar2cart, r15, r180, r90 } from "./plum.js";
const canvas = document.querySelector(".plum");

const { random } = Math;
let MIN_BRANCH = 30;
let len = 6;
let f = {
  start: () => {},
};
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const { ctx } = initCanvas(canvas, size.width, size.height);
const { width, height } = canvas;
let steps = [];
let iterations = 0;

const step = (x, y, rad, counter = { value: 0 }) => {
  const length = random() * len;
  counter.value += 1;
  const [nx, ny] = polar2cart(x, y, length, rad);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(nx, ny);
  ctx.stroke();

  const rad1 = rad + random() * r15;
  const rad2 = rad - random() * r15;
  // 渲染宽高
  // out of bounds
  if (nx < -100 || nx > size.width + 100 || ny < -100 || ny > size.height + 100)
    return;
  const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;
  // left branch
  if (random() < rate) steps.push(() => step(nx, ny, rad1, counter));
  // right branch
  if (random() < rate) steps.push(() => step(nx, ny, rad2, counter));
};
const frame = () => {
  iterations += 1;
  const prevSteps = [...steps];
  steps = [];
  for (const fn of prevSteps) {
    fn();
  }
};
let framesCount = 0;
function startFrame() {
  // 逐帧
  requestAnimationFrame(() => {
    framesCount += 1;
    if (framesCount % 5 === 0) frame();
    startFrame();
  });
}

startFrame();
const randomMiddle = () => random() * 0.6 + 0.2;
f.start = () => {
  iterations = 0;
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#88888825"; //中度灰 支持暗黑模式
  steps = [
    () => step(randomMiddle() * size.width, -5, r90),
    () => step(randomMiddle() * size.width, size.height + 5, -r90),
    () => step(-5, randomMiddle() * size.height, 0),
    () => step(size.width + 5, randomMiddle() * size.height, r180),
  ];
  if (size.width < 500) steps = steps.slice(0, 2);
};

f.start();
