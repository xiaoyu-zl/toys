import random from "../utils/random.js";
import { getLunchOptions } from "../api/request.js";
(async () => {
  const { data } = await getLunchOptions();
  let lunchOptions = data;
  const { startRandomFoodDisplay, stopRandomFoodDisplay } =
    random(lunchOptions);
  // 随机显示食物
  function chooseLunch() {
    const randomIndex = Math.floor(Math.random() * lunchOptions.length);
    document.getElementById("lunchResult").innerText =
      lunchOptions[randomIndex];
  }
  // 点击按钮切换显示食物
  let toggleButton = document.getElementById("toggleButton");
  let intervalId = null;
  let count = 0;
  toggleButton.onclick = function () {
    if (count >= 6) {
      alert("这么作？今天别吃了！");
      // 隐藏按钮
      toggleButton.style.display = "none";
      return;
    }
    // 停止定时器
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      this.value = "不行，换一个";
      stopRandomFoodDisplay();
    } else {
      // 开始定时器
      intervalId = setInterval(chooseLunch, 50); // 每100毫秒选择一次
      this.value = "停止";
      startRandomFoodDisplay(100, lunchOptions);
      startRandomFoodDisplay(100, lunchOptions);
    }
    count++;
  };
})();
