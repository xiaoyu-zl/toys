let appIdDom = document.querySelector(".appId");
let keyDom = document.querySelector(".key");
let appId = "";
let key = "";
appIdDom.onblur = () => {
  if (appIdDom.value) {
    appId = appIdDom.value;
    localStorage.setItem("appId", appIdDom.value);
  }
};
keyDom.onblur = () => {
  if (keyDom.value) {
    key = keyDom.value;
    localStorage.setItem("key", keyDom.value);
  }
};
appIdDom.value = localStorage.getItem("appId");
appId = appIdDom.value;
keyDom.value = localStorage.getItem("key");
key = keyDom.value;

export { appId, key };
