const express = require("express");
const router = express.Router();

const axios = require("axios");
const { truncate } = require("./translateUtils/index.js");
const { MD5 } = require("./translateUtils/md5.js");
const CryptoJS = require("crypto-js");
router
  .get("/youDaoApi", (req, resd) => {
    const { q, appid, key, from, to } = req.query;
    let curtime = Math.round(new Date().getTime() / 1000);
    let salt = new Date().getTime();
    let str1 = appid + truncate(q) + salt + curtime + key;
    let sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
    let query = {
      q,
      appKey: appid,
      salt,
      from,
      to,
      sign,
      signType: "v3",
      curtime,
      vocabId: "",
    };
    axios({
      url: "https://openapi.youdao.com/api",
      params: query,
      method: "get",
    })
      .then((res) => {
        resd.send(res.data);
      })
      .catch((error) => {
        resd.send(error);
      });
  })
  .get("/baiDuApi", (req, resd) => {
    const { q, appid, key, from, to } = req.query;
    let salt = new Date().getTime();
    let str1 = appid + q + salt + key;
    let sign = MD5(str1);
    let query = {
      q,
      appid: appid,
      from,
      to,
      salt,
      sign,
    };
    axios({
      url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
      params: query,
      method: "get",
    })
      .then((res) => {
        resd.send(res.data);
      })
      .catch((error) => {
        resd.send(error);
      });
  });
module.exports = router;
