const express = require("express");
const fs = require("fs");
const {
  getHtmlMeatAndTitle,
  initHomeHtml,
  initHtml,
} = require("./utils/index");
const app = express();

const { readDirSync } = require("./registered/htmlRegistered");
let html = readDirSync("html");

const htmlKeyValList = Object.entries(html);
const homeIndex = htmlKeyValList.findIndex(([key]) => key === "/home");
const homeKeyVal = htmlKeyValList.splice(homeIndex, 1);

const htmlDestArrays = [];
for (const [key, val] of [...htmlKeyValList, ...homeKeyVal]) {
  const isHome = key === "/home";
  let urlPath = isHome ? "/" : key;
  let returnHtml;
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
      returnHtml = initHtml(data);
    } else {
      returnHtml = initHomeHtml(
        fs.readFileSync(__dirname + val, "utf8"),
        htmlDestArrays,
      );
    }
    //读取html内容
    app.get(urlPath, (req, res) => {
      res.setHeader("Content-Type", "text/html");
      res.send(returnHtml);
    });
  } catch (err) {
    console.error("get HTML error", err);
  }
}

const translate = require("./router/translate");
app.use("/translate", translate);
const job = require("./router/job");
app.use("/job", job);
// TODO 静态资源中间件挂载顺序在接口定义之前执行优先级会比接口高。
app.use(express.static("html"));
app.listen(5478, () => {
  console.log(" http://localhost:5478");
});
