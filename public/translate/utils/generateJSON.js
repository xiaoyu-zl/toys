import { downloadFile } from "./index.js";
export const generate = (data) => {
  //可以将 translationData数据处理成 excel
  const stringData = JSON.stringify(data, null, 2);
  // dada 表示要转换的字符串数据，type 表示要转换的数据格式
  const blob = new Blob([stringData], {
    type: "application/json",
  });
  // 根据 blob生成 url链接
  const objectURL = URL.createObjectURL(blob);
  downloadFile(objectURL, "translation.json");
  URL.revokeObjectURL(objectURL);
};
