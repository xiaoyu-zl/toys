import { from, to } from "../js/selectChange.js";
import { appId, key } from "../js/appKey.js";
// 有道翻译接口
const youDaotranslation = (query) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${prefix}/translate/youDaoApi?q=${query}&appid=${appId}&key=${key}&from=${from}&to=${to}`
    )
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export { youDaotranslation };
