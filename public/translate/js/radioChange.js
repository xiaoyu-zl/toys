import { init } from "./selectChange.js";
let radio = document.getElementsByName("api");
let api = "youdao";
for (const item of radio) {
  item.onclick = () => {
    api = item.value;
    init();
  };
}
window.addEventListener("load", function () {
  radio[0].checked = true;
});

export { api };
