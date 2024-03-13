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
const translate = require('./router/translate')
app.use('/translate',translate)
app.listen(5478, () => {
  console.log(" http://localhost:5478");
});
