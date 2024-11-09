import random from "./random.js";
import { getLunchOptions } from "./request.js";
(async () => {
  let lunchOptions = ["火锅", "烤肉", "麻辣烫", "海鲜", "披萨"];
  getLunchOptions();
  const { startRandomFoodDisplay, stopRandomFoodDisplay } =
    random(lunchOptions);
  // 随机显示食物
  let intervalId = null;
  function chooseLunch() {
    const randomIndex = Math.floor(Math.random() * lunchOptions.length);
    document.getElementById("lunchResult").innerText =
      lunchOptions[randomIndex];
  }
  document.getElementById("toggleButton").onclick = function () {
    // 停止定时器
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      this.value = "开始";
      stopRandomFoodDisplay();
    } else {
      // 开始定时器
      intervalId = setInterval(chooseLunch, 50); // 每100毫秒选择一次
      this.value = "停止";
      startRandomFoodDisplay(100, lunchOptions);
      startRandomFoodDisplay(100, lunchOptions);
    }
  };
})();
