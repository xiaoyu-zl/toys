const express = require("express");
const fs = require("fs");
const router = express.Router();
// 获取json数据
router.get("/lunchOptions", (req, resd) => {
  const data = fs.readFileSync(__dirname + "/data.json", "utf8");
  const approval = fs.readFileSync(__dirname + "/approval.json", "utf8");
  // 处理json数据
  const jsonData = JSON.parse(data);
  const jsonApproval = JSON.parse(approval);
  resd.send({
    data: [...jsonData, ...jsonApproval],
  });
});
// 修改json数据
router.post("/lunchOptions/edit", (req, resd) => {
  const data = fs.readFileSync(__dirname + "/data.json", "utf8");
  const approval = fs.readFileSync(__dirname + "/approval.json", "utf8");
  const jsonData = JSON.parse(data);
  const jsonApproval = JSON.parse(approval);
  const { food } = req.body;
  if (!(jsonData.includes(food) && jsonApproval.includes(food))) {
    jsonApproval.push(food);
    const newData = JSON.stringify(jsonApproval);
    fs.writeFileSync(__dirname + "/approval.json", newData, "utf8");
    resd.send({
      message: "增加成功",
    });
  } else {
    resd.send({
      message: "已存在该食物",
    });
  }
});
module.exports = router;
