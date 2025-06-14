const themeScript = document.querySelector("#theme-script");
window.$env = JSON.parse(
  !!themeScript.dataset.env ? themeScript.dataset.env : ""
);
let getTheme = localStorage.getItem("theme");
let theme = getTheme ? getTheme == "dark" : false;
let moonSvg = "./global/img/moon.svg";
let sunSvg = "./global/img/sun.svg";
if (
  theme ||
  (!getTheme &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
}
window.onload = () => {
  let toggle = document.querySelector(".toggle");
  let toggleIcon = document.querySelector(".toggle_icon");
  toggleIcon.src = theme ? moonSvg : sunSvg;
  toggle.addEventListener("click", (e) => {
    const { clientX, clientY } = e;
    // 设置主题
    theme = !theme;
    setHTMLProperty(clientX, clientY, theme);
    localStorage.setItem("theme", theme ? "dark" : "light");
    localStorage.setItem(
      "message",
      JSON.stringify({
        message: "消息",
        from: {
          key: "theme",
          theme: theme,
          x: clientX,
          y: clientY,
        },
        date: Date.now(),
      })
    );
  });
  window.onstorage = (e) => {
    // 如果存储的key为message，且存储的from属性为theme
    if (e.key == "message") {
      // 解析存储的值
      let {
        from: { key, theme: isDark, x, y },
      } = JSON.parse(e.newValue) || e.newValue;
      if (key !== "theme") return;
      //设置主题
      setHTMLProperty(x, y, isDark);
      // 切换theme的值
    }
  };
  // 修改html属性 style变量及class
  const setHTMLProperty = (clientX, clientY, isDark) => {
    toggleIcon.src = isDark ? moonSvg : sunSvg;
    if (document?.startViewTransition) {
      const transition = document?.startViewTransition(() => {
        document.documentElement.classList.toggle("dark");
      });
      transition.ready.then(() => {
        const endRadius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );
        const clipPath = [
          `circle(0px at ${clientX}px ${clientY}px)`,
          `circle(${endRadius}px at ${clientX}px ${clientY}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: isDark ? clipPath.reverse() : clipPath,
          },
          {
            duration: 450,
            easing: "ease-in",
            pseudoElement: isDark
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          }
        );
      });
    } else {
      // 否则直接切换dark属性
      document.documentElement.classList.toggle("dark");
    }
  };
};
