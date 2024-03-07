const fs = require("fs");
const { resolve, sep } = require("path");
const readDirSync = (dirPath) => {
  let result = {};
  let initPath = dirPath.replaceAll("/", sep);
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const url = `${dirPath}${sep}${file}`;
    const urlStartIndex = url.indexOf(initPath) + initPath.length;
    const urlEndIndex = url.length;
    const apiUrl = url
      .substring(urlStartIndex, urlEndIndex)
      .replaceAll(sep, "/");

    result[apiUrl] = "/html" + apiUrl + "/index.html";
  }
  return result;
};

module.exports = {
  readDirSync,
};
