import { from, to } from "../js/selectChange.js";
import { appId, key } from "../js/appKey.js";
// 百度翻译接口
const baiDutranslation = (query) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${prefix}/translate/baiDuApi?q=${query}&appid=${appId}&key=${key}&from=${from}&to=${to}`,
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
export { baiDutranslation };
