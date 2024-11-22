export default (lunchOptions) => {
  function getRandomPosition() {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    return { x, y };
  }
  function displayRandomFood() {
    const option =
      lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
    const position = getRandomPosition();
    const foodItem = document.createElement("div");
    foodItem.className = "food-item";
    foodItem.innerText = option;
    // 随机生成字体大小
    const fontSize = Math.floor(Math.random() * (40 - 18 + 1)) + 18;
    foodItem.style.fontSize = fontSize + "px";
    // 随机生成透明度
    const opacity = Math.random() * (1 - 0.2) + 0.2;
    foodItem.style.opacity = opacity;
    // 随机生成位置
    foodItem.style.left = position.x + "px";
    foodItem.style.top = position.y + "px";
    document.body.appendChild(foodItem);
    setTimeout(() => {
      setTimeout(() => {
        document.body.removeChild(foodItem);
      }, 500);
    }, 500);
  }
  let intervals = [];
  function startRandomFoodDisplay(intervalTime) {
    const intervalId = setInterval(displayRandomFood, intervalTime);
    intervals.push(intervalId);
  }
  function stopRandomFoodDisplay() {
    intervals.forEach(clearInterval);
    intervals = [];
  }
  return { startRandomFoodDisplay, stopRandomFoodDisplay };
};
