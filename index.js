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
const translate = require("./router/translate");
app.get("/menu", (req, res) => {
  data = menu.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  res.send({
    data: data,
  });
});
app.use("/translate", translate);
app.listen(5478, () => {
  console.log(" http://localhost:5478");
});
