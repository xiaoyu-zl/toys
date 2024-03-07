let pageId = null;
const card = document.querySelector(".card");
const bToolbarHeight = window.outerHeight - window.innerHeight; // 浏览器顶部工具栏高度
// 页面标识 主页判断
if (!localStorage.getItem("page")) {
  // 第一个页面进入的页面定义为主页面
  pageId = Math.random().toString(36).substring(2);
  localStorage.setItem("page", pageId);
  // 获取初始位置
  localStorage.setItem(
    "coordinate",
    JSON.stringify(getScreenPoint(card.offsetLeft, card.offsetTop)),
  );
} else {
  // 确保刷新 副页面位置不丢失
  const [cx, cy] = getClientPoint(
    ...JSON.parse(localStorage.getItem("coordinate")),
  );
  card.style.left = cx + "px";
  card.style.top = cy + "px";
}
// 根据屏幕坐标 获取元素坐标
function getClientPoint(screenX, screenY) {
  const centerX = screenX - window.screenX;
  const centerY = screenY - window.screenY - bToolbarHeight;
  return [centerX, centerY];
}
// 根据元素坐标 获取屏幕坐标
function getScreenPoint(centerX, centerY) {
  const screenX = centerX + window.screenX;
  const screenY = centerY + window.screenY + bToolbarHeight;
  return [screenX, screenY];
}
// 拖拽函数
card.onmousedown = (e) => {
  let x = e.pageX - card.offsetLeft;
  let y = e.pageY - card.offsetTop;
  window.onmousemove = (e) => {
    const cx = e.pageX - x;
    const cy = e.pageY - y;
    card.style.left = cx + "px";
    card.style.top = cy + "px";
    // 通知
    localStorage.setItem(
      "coordinate",
      JSON.stringify(getScreenPoint(cx, cy)),
    );
  };
  window.onmouseup = () => {
    window.onmousemove = null;
    window.onmouseup = null;
  };
};

window.addEventListener("storage", (event) => {
  if (event.key === "coordinate") {
    const [cx, cy] = getClientPoint(...JSON.parse(event.newValue));
    card.style.left = cx + "px";
    card.style.top = cy + "px";
  }
});
// 监听浏览器关闭刷新  主页清除 localStorage
window.addEventListener("beforeunload", function (e) {
  if (localStorage.getItem("page") == pageId) {
    localStorage.removeItem("page");
    localStorage.removeItem("coordinate");
  }
});