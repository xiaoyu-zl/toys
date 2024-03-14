const express = require("express");
const fs = require("fs");
const {
  getHtmlMeatAndTitle,
  initHomeHtml,
  initHtml,
} = require("./utils/index");
const app = express();
app.use(express.static("html"));
const { readDirSync } = require("./registered/htmlRegistered");
let html = readDirSync("html");

const htmlKeyValList = Object.entries(html);
const homeIndex = htmlKeyValList.findIndex(([key]) => key === "/home");
const homeKeyVal = htmlKeyValList.splice(homeIndex, 1);

const htmlDestArrays = [];
for (const [key, val] of [...htmlKeyValList, ...homeKeyVal]) {
  const isHome = key === "/home";
  let urlPath = isHome ? "/" : key;
  try {
    if (!isHome) {
      const data = fs.readFileSync(__dirname + val, "utf8");
      if (!!data) {
        const [titleText, text, author, createdDate] =
          getHtmlMeatAndTitle(data);
        htmlDestArrays.push({
          titleText,
          text,
          author,
          createdDate,
          key,
        });
      }
    }
    //读取html内容
    console.log(urlPath);
    app.get(urlPath, (req, res) => {
      console.log(urlPath);
      const html = isHome
        ? initHomeHtml(fs.readFileSync(__dirname + val, "utf8"), htmlDestArrays)
        : initHtml(__dirname + val);
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    });
  } catch (err) {
    console.error("get HTML error", err);
  }
}

const translate = require("./router/translate");
app.use("/translate", translate);
const job = require("./router/job");
app.use("/job", job);
app.listen(5478, () => {
  console.log(" http://localhost:5478");
});
