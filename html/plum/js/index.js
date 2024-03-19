import { initCanvas, polar2cart, r15, r180, r90, rangeRandom } from "./plum.js";
const canvas = document.querySelector(".plum");

const { random } = Math;
let init = 4;
let len = 6;
let f = {
  start: () => {},
};

const { ctx } = initCanvas(canvas, window.innerWidth, window.innerHeight);
const { width, height } = canvas;
let steps = [];
let iterations = 0;

const step = (x, y, rad) => {
  const length = random() * len;
  const [nx, ny] = polar2cart(x, y, length, rad);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(nx, ny);
  ctx.stroke();

  const rad1 = rad + random() * r15;
  const rad2 = rad - random() * r15;
  // 渲染宽高
  if (nx < -100 || nx > width || ny < -100 || ny > height) return;
  if (iterations <= init || random() > 0.5)
    steps.push(() => step(nx, ny, rad1));
  if (iterations <= init || random() > 0.5)
    steps.push(() => step(nx, ny, rad2));
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

f.start = () => {
  iterations = 0;
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#88888825"; //中度灰 支持暗黑模式
  // 控制生长范围 去除两边百分之30
  let rangeWidth = parseInt(width * 0.3);
  let rangeHeight = parseInt(height * 0.3);
  steps =
    width <= 500
      ? [
          () => step(rangeRandom(rangeWidth, width - rangeWidth), 0, r90), //上
          () => step(rangeRandom(rangeWidth, width - rangeWidth), height, -r90), //下
        ]
      : [
          () => step(0, rangeRandom(rangeHeight, width - rangeHeight), 0), //左
          () =>
            step(width, rangeRandom(rangeHeight, width - rangeHeight), r180), //右
          () => step(rangeRandom(rangeWidth, width - rangeWidth), 0, r90), //上
          () => step(rangeRandom(rangeWidth, width - rangeWidth), height, -r90), //下
        ];
};

f.start();
