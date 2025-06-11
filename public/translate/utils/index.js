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

export const calculateLength = (obj) => {
  let count = 0;
  const helper = (currentObj) => {
    for (const [key, value] of Object.entries(currentObj)) {
      if (typeof value === "object" && value !== null) {
        // 如果当前值是对象，递归调用
        helper(value);
      } else {
        // 如果不是对象，计数
        count++;
      }
    }
  };
  helper(obj);
  return count;
};
