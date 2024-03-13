const express = require("express");
const app = express();
app.use(express.static("html"));
const { readDirSync } = require("./registered/htmlRegistered");
const menu = require("./menu.json");
let html = readDirSync("html");
for (const [key, val] of Object.entries(html)) {
  app.get(key === "/home" ? "/" : key, (req, res) => {
    res.sendFile(__dirname + val);
  });
}
app.get("/menu", (req, res) => {
  data = menu.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  res.send({
    data: data,
  });
});
const translate = require("./router/translate");
app.use("/translate", translate);
const job = require("./router/job");
app.use("/job", job);
app.listen(5478, () => {
  console.log(" http://localhost:5478");
});
