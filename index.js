const express = require("express");
const fs = require("fs");
const { getHtmlMeatAndTitle, substringHtml } = require("./utils/index");
const app = express();
app.use(express.static("html"));
const { readDirSync } = require("./registered/htmlRegistered");
const menu = require("./menu.json");
let html = readDirSync("html");

const htmlKeyValList = Object.entries(html);
const homeIndex = htmlKeyValList.findIndex(([key]) => key === "/home");
const homeKeyVal = htmlKeyValList.splice(homeIndex, 1);

const htmlDestArrays = [];
for (const [key, val] of [...htmlKeyValList, ...homeKeyVal]) {
  const isHome = key === "/home";
  let urlPath = key + "/";
  try {
    //读取html内容
    const data = fs.readFileSync(__dirname + val, "utf8");
    if (isHome) {
      urlPath = "/";

      const [htmlStart, htmlEnd] = substringHtml(data);
      const htmlString = `${htmlStart} data-menu-val=${JSON.stringify(
        htmlDestArrays,
      )}  ${htmlEnd}`;
      app.get(urlPath, (req, res) => {
        res.setHeader("Content-Type", "text/html");
        res.send(htmlString);
      });
    } else {
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
      app.get(urlPath, (req, res) => {
        res.sendFile(__dirname + val);
      });
    }
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
