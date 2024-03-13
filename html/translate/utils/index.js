export const downloadFile = (url, fileName) => {
  const aTag = document.createElement("a");
  // 设置文件的下载地址
  aTag.href = url;
  // 设置保存后的文件名称
  aTag.download = fileName;
  // 给 a 标签添加点击事件
  aTag.click();

  aTag.remove();
};


