import { fileData } from "./useJSONUpData.js";
import { api } from "./radioChange.js";
import { youDaotranslation } from "../utils/youdaoApi.js";
import { baiDutranslation } from "../utils/baiDuApi.js";
import { generate } from "../utils/generateJSON.js";
import { calculateLength } from "../utils/index.js";

// 按钮点击事件处理
const btn = document.querySelector(".btn");
let totality = document.querySelector(".totality");
let current = document.querySelector(".current");
let abnormal = document.querySelector(".abnormal");
btn.onclick = () => {
  if (!fileData) {
    alert("请上传JSON数据源");
    console.error("请上传JSON数据源");
    return;
  }
  api == "youdao" ? youDao() : baiDu();
};

const youDao = async () => {
  let translationData = {};
  totality.innerHTML = calculateLength(fileData);
  current.innerHTML = "0";
  abnormal.innerHTML = "0";
  const helper = async (currentObj, currentData) => {
    for (const [key, value] of Object.entries(currentObj)) {
      if (typeof value === "object" && value !== null) {
        // 如果是对象，则在当前翻译数据中创建一个新对象
        currentData[key] = {};
        await helper(value, currentData[key]); // 递归调用
      } else {
        try {
          const {
            query,
            translation: [valText],
          } = await youDaotranslation(value);
          currentData[key] = valText; // 储存翻译结果
        } catch (error) {
          console.error(`${key}翻译出错;`, error);
          currentData[key] = null; // 储存翻译出错标识
          abnormal.innerHTML = (Number(abnormal.innerHTML) + 1).toString();
        }
        current.innerHTML = (Number(current.innerHTML) + 1).toString();
      }
    }
  };
  await helper(fileData, translationData); // 传入translationData作为初始数据
  generate(translationData);
};

const baiDu = async () => {
  let translationData = {};
  totality.innerHTML = calculateLength(fileData);
  current.innerHTML = "0";
  abnormal.innerHTML = "0";
  const helper = async (currentObj, currentData) => {
    for (const [key, value] of Object.entries(currentObj)) {
      if (typeof value === "object" && value !== null) {
        // 如果是对象，则在当前翻译数据中创建一个新对象
        currentData[key] = {};
        await helper(value, currentData[key]); // 递归调用
      } else {
        try {
          const {
            trans_result: [{ dst, src }],
          } = await baiDutranslation(value); // 修改val为value
          currentData[key] = dst; // 储存翻译结果
        } catch (error) {
          console.error(`${key}翻译出错;`, error);
          currentData[key] = null; // 储存翻译出错标识
          abnormal.innerHTML = (Number(abnormal.innerHTML) + 1).toString();
        }
        current.innerHTML = (Number(current.innerHTML) + 1).toString();
      }
    }
  };
  await helper(fileData, translationData); // 传入translationData作为初始数据
  generate(translationData);
};
