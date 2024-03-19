let toggle = document.querySelector(".toggle");
let toggle_icon = document.querySelector(".toggle_icon");
let getTheme = localStorage.getItem("theme");
let theme = getTheme ? getTheme == "dark" : false;
if (theme) {
  document.documentElement.classList.add("dark");
  toggle_icon.src = theme ? "./svg/moon.svg" : "./svg/sun.svg";
}
window.onstorage = (e) => {
  // 如果存储的key为message，且存储的from属性为theme
  if (e.key == "message") {
    // 解析存储的值
    let {
      from: { key },
    } = JSON.parse(e.newValue) || e.newValue;
    if (key !== "theme") return;
    //设置主题
    setHTMLProperty();
    // 切换theme的值
    theme = !theme;
    toggle_icon.src = theme ? "./svg/moon.svg" : "./svg/sun.svg";
  }
};
toggle.addEventListener("click", () => {
  // 设置主题
  setHTMLProperty();
  theme = !theme;
  toggle_icon.src = theme ? "./svg/moon.svg" : "./svg/sun.svg";
  // 保存消息到 localStorage 中
  localStorage.setItem("theme", theme ? "dark" : "light");
  localStorage.setItem(
    "message",
    JSON.stringify({
      message: "消息",
      from: {
        key: "theme",
        theme: theme ? "dark" : "light",
      },
      date: Date.now(),
    }),
  );
});

// 修改html属性 style变量及class
const setHTMLProperty = () => {
  //获取dom坐标
  const { height, width, x: X, y: Y } = toggle.getBoundingClientRect();
  const x = width / 2 + X;
  const y = height / 2 + Y;
  const { style } = document.documentElement;
  // 动画结束位置
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );
  const obj = {
    x,
    y,
    endRadius,
  };
  // 设置HTML style的属性
  for (const [key, val] of Object.entries(obj)) {
    style.setProperty(`--${key}`, val + "px");
  }
  // 如果document有startViewTransition方法
  if (document?.startViewTransition) {
    // 调用startViewTransition方法，并传入一个函数，用于切换dark属性
    document?.startViewTransition(() => {
      document.documentElement.classList.toggle("dark");
    });
  } else {
    // 否则直接切换dark属性
    document.documentElement.classList.toggle("dark");
  }
};
