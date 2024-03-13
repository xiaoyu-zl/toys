import { fileData } from "./useJSONUpData.js";
import { api } from "./radioChange.js";
import { youDaotranslation } from "../utils/youdaoApi.js";
import { baiDutranslation } from "../utils/baiDuApi.js";
import { generate } from "../utils/generateJSON.js";

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
  totality.innerHTML = Object.keys(fileData).length.toString();
  current.innerHTML = "0";
  abnormal.innerHTML = "0";
  for (const [key, val] of Object.entries(fileData)) {
    try {
      const {
        query,
        translation: [valText],
      } = await youDaotranslation(val);
      translationData[key] = valText;
      // translationData[key] = {
      //   [from]: query,
      //   [to]: valText,
      // };
    } catch (error) {
      console.error(`${key}翻译出错;`, error);
      translationData[key] = null;
      // translationData[key] = {
      //   [from]: null,
      //   [to]: null,
      // };
      abnormal.innerHTML = (Number(abnormal.innerHTML) + 1).toString();
    }
    current.innerHTML = (Number(current.innerHTML) + 1).toString();
  }
  generate(translationData);
};

const baiDu = async () => {
  let translationData = {};
  totality.innerHTML = Object.keys(fileData).length.toString();
  current.innerHTML = "0";
  abnormal.innerHTML = "0";
  for (const [key, val] of Object.entries(fileData)) {
    try {
      const {
        trans_result: [{ dst, src }],
      } = await baiDutranslation(val);
      translationData[key] = dst;
      // translationData[key] = {
      //   [from]: src,
      //   [to]: dst,
      // };
    } catch (error) {
      console.error(`${key}翻译出错;`, error);
      translationData[key] = null;
      // translationData[key] = {
      //   [from]: null,
      //   [to]: null,
      // };
      abnormal.innerHTML = (Number(abnormal.innerHTML) + 1).toString();
    }
    current.innerHTML = (Number(current.innerHTML) + 1).toString();
  }
  generate(translationData);
};
