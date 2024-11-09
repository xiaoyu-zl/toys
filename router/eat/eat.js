const express = require("express");
const fs = require("fs");
const router = express.Router();
router.get("/lunchOptions", (req, resd) => {
  // const data = fs.readFileSync("./data.json", "utf8");
  // console.log(data);
  resd.send({
    data: "data",
  });
});

module.exports = router;
