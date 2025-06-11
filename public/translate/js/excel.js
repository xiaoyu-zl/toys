import { fileData } from "./useJSONUpData.js";
import { api } from "./radioChange.js";
import { from, fromText, to, toText } from "./selectChange.js";
import { youDaotranslation } from "../utils/youdaoApi.js";
import { baiDutranslation } from "../utils/baiDuApi.js";
import { exportJSONExcel } from "../utils/excelExport.js";
let totality = document.querySelector(".totality");
let current = document.querySelector(".current");
let abnormal = document.querySelector(".abnormal");
import { calculateLength } from "../utils/index.js";
const excelLoad = async () => {
  const excelBtn = document.querySelector(".btn_excel");
  excelBtn.onclick = () => {
    if (!fileData) {
      alert("请上传JSON数据源");
      return;
    }
    api == "youdao" ? youDao() : baiDu();
  };
};
const youDao = async () => {
  const jsonValues = {};
  totality.innerHTML = calculateLength(fileData);
  current.innerHTML = "0";
  abnormal.innerHTML = "0";
  const helper = async (currentObj) => {
    for (const [key, value] of Object.entries(currentObj)) {
      if (typeof value === "object" && value !== null) {
        await helper(value);
      } else {
        try {
          const {
            query,
            translation: [valText],
          } = await youDaotranslation(value);
          jsonValues[key] = {
            [from]: query,
            [to]: valText,
          };
        } catch (error) {
          console.error(`${key}翻译出错;`, error);
          jsonValues[key] = {
            [from]: value,
            [to]: null,
          };
          abnormal.innerHTML = (Number(abnormal.innerHTML) + 1).toString();
        }
        current.innerHTML = (Number(current.innerHTML) + 1).toString();
      }
    }
  };
  await helper(fileData);
  const data = Object.entries(jsonValues).map(([key, val]) => {
    return { index: key, ...val };
  });
  exportJSONExcel(data, [
    { header: "多语言文本唯一编码", key: "index", width: 20 },
    { header: fromText, key: from, width: 20 },
    { header: toText, key: to, width: 20 },
    { header: "备注", key: "notes", width: 20 },
  ]);
};
const baiDu = async () => {
  const jsonValues = {};
  totality.innerHTML = calculateLength(fileData);
  current.innerHTML = "0";
  abnormal.innerHTML = "0";
  const helper = async (currentObj) => {
    for (const [key, value] of Object.entries(currentObj)) {
      if (typeof value === "object" && value !== null) {
        await helper(value);
      } else {
        try {
          const {
            trans_result: [{ dst, src }],
          } = await baiDutranslation(value);
          jsonValues[key] = {
            [from]: src,
            [to]: dst,
          };
        } catch (error) {
          console.error(`${key}翻译出错;`, error);
          jsonValues[key] = {
            [from]: value,
            [to]: null,
          };
          abnormal.innerHTML = (Number(abnormal.innerHTML) + 1).toString();
        }
        current.innerHTML = (Number(current.innerHTML) + 1).toString();
      }
    }
  };
  await helper(fileData);
  const data = Object.entries(jsonValues).map(([key, val]) => {
    return { index: key, ...val };
  });
  exportJSONExcel(data, [
    { header: "多语言文本唯一编码", key: "index", width: 20 },
    { header: fromText, key: from, width: 20 },
    { header: toText, key: to, width: 20 },
    { header: "备注", key: "notes", width: 20 },
  ]);
};
window.addEventListener("load", excelLoad);
