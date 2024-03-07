const express = require("express");
const app = express();
app.use(express.static("html"));
const { readDirSync } = require("./registered/htmlRegistered");
let html = readDirSync("html");
for (const [key, val] of Object.entries(html)) {
  app.get(key === "/home" ? "/" : key, (req, res) => {
    res.sendFile(__dirname + val);
  });
}
app.listen(5475, () => {
  console.log("雨过不知龙去除，一池藻色万娃鸣 http://localhost:5475");
});
