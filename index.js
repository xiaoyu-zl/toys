const express = require("express");
const fs = require("fs");
const app = express();
const expressWs = require("express-ws");
const chokidar = require("chokidar");
const { NODE_ENV } = require("./env");
const {
  getHtmlMeatAndTitle,
  initHomeHtml,
  initHtml,
} = require("./utils/index");
const clients = [];
if (NODE_ENV === "dev") {
  expressWs(app);
  // 存储 WebSocket 客户端列表
  // WebSocket 路由
  app.ws("/reload", (ws, req) => {
    // 将新连接的客户端添加到列表
    clients.push(ws);
    ws.on("close", () => {
      // 当连接关闭时，从列表中移除
      clients.splice(clients.indexOf(ws), 1);
    });
  });

  // 监听 HTML 文件的变化
  const htmlWatcher = chokidar.watch("html", {
    ignored: /[\/\\]\./,
    persistent: true,
  });
  htmlWatcher.on("change", () => {
    // 发送消息给所有连接的客户端
    for (const client of clients) {
      if (client.readyState === client.OPEN) {
        client.send("reload");
      }
    }
  });
}
const { readDirSync } = require("./registered/htmlRegistered");
let html = readDirSync("html");
const htmlKeyValList = Object.entries(html);
const homeHtml = htmlKeyValList.find(([key]) => key === "/home");
const routineHtml = htmlKeyValList.filter((item) => item[0] !== "/home");
for (const [key, val] of routineHtml) {
  try {
    app.get(key, (req, res) => {
      // 获取html内容
      let returnHtml = initHtml(fs.readFileSync(__dirname + val, "utf8"));
      res.setHeader("Content-Type", "text/html");
      res.send(returnHtml);
    });
  } catch (err) {
    console.error("get HTML error", err);
  }
}
try {
  //home页面
  app.get("/", (req, res) => {
    const htmlDestArrays = [];
    // 获取menu数据
    for (const [key, val] of routineHtml) {
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
    // 获取html内容
    let returnHtml = initHomeHtml(
      fs.readFileSync(__dirname + homeHtml[1], "utf8"),
      htmlDestArrays,
    );
    res.setHeader("Content-Type", "text/html");
    res.send(returnHtml);
  });
} catch (err) {
  console.error("get HTML error", err);
}
const translate = require("./router/translate/translate");
app.use("/translate", translate);
const job = require("./router/job/job");
app.use("/job", job);
const eat = require("./router/eat/eat");
app.use("/eat", eat);
// TODO 静态资源中间件挂载顺序在接口定义之前执行优先级会比接口高。
app.use(express.static("html"));
app.listen(5478, () => {
  // 重新启动1.5秒后发现服务 发送通知给 WebSocket 客户端
  if (NODE_ENV === "dev") {
    setTimeout(() => {
      for (const client of clients) {
        if (client.readyState === client.OPEN) {
          client.send("reload");
        }
      }
    }, 1500);
  }
  console.log(" http://localhost:5478");
});
