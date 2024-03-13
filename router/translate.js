const express = require('express');
const router = express.Router();

const axios = require("axios");
const { truncate } = require("./translateUtils/index.js");
const { MD5 } = require("./translateUtils/md5.js");
const CryptoJS = require("crypto-js");
const { youDaoId, youDaoKey, baiDuId, baiDuKey } = require("./translateUtils/key.js");
router
  .get("/youDaoApi", (req, resd) => {
    const { q, appid, key, from, to } = req.query;
    let isUse = appid == "zzl" && key == "066752";
    let curtime = Math.round(new Date().getTime() / 1000);
    let salt = new Date().getTime();
    let str1 = isUse
      ? youDaoId + truncate(q) + salt + curtime + youDaoKey
      : appid + truncate(q) + salt + curtime + key;
    let sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
    let query = {
      q,
      appKey: isUse ? youDaoId : appid,
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
    let isUse = appid == "zzl" && key == "066752";
    let salt = new Date().getTime();
    let str1 = isUse ? baiDuId + q + salt + baiDuKey : appid + q + salt + key;
    let sign = MD5(str1);
    let query = {
      q,
      appid: isUse ? baiDuId : appid,
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