const express = require("express");
const router = express.Router();

const axios = require("axios");
const { truncate } = require("../../utils/truncate.js");
const { MD5 } = require("../../utils/md5.js");
const CryptoJS = require("crypto-js");

// 队列定义
const queues = {
  youdao: [],
  baidu: [],
};
const timers = {
  youdao: null,
  baidu: null,
};

// 通用队列处理函数
function processQueue(type, buildQuery, url) {
  if (queues[type].length === 0) {
    clearInterval(timers[type]);
    timers[type] = null;
    return;
  }
  const { query, res } = queues[type].shift();
  if (!query.q || !query.appid || !query.key || !query.from || !query.to) {
    res.status(400).json({ error: "Missing required parameters" });
    return;
  }
  const params = buildQuery(query);
  axios
    .get(url, { params })
    .then((result) => res.json(result.data))
    .catch((error) => {
      res.status(500).json({ error: error.message || "Request failed" });
    });
}

// 有道云参数构建
function buildYoudaoQuery({ q, appid, key, from, to }) {
  const curtime = Math.round(Date.now() / 1000);
  const salt = Date.now();
  const str1 = appid + truncate(q) + salt + curtime + key;
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
  return {
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
}

// 百度参数构建
function buildBaiduQuery({ q, appid, key, from, to }) {
  const salt = Date.now();
  const str1 = appid + q + salt + key;
  const sign = MD5(str1);
  return {
    q,
    appid,
    from,
    to,
    salt,
    sign,
  };
}

// 队列入队中间件
function addToQueue(type) {
  const buildQuery = type === "youdao" ? buildYoudaoQuery : buildBaiduQuery;
  const url =
    type === "youdao"
      ? "https://openapi.youdao.com/api"
      : "https://fanyi-api.baidu.com/api/trans/vip/translate";
  return (req, res) => {
    queues[type].push({ query: req.query, res });
    // 如果定时器未启动，则启动
    if (!timers[type]) {
      timers[type] = setInterval(
        () => processQueue(type, buildQuery, url),
        1700
      );
    }
  };
}

router.get("/youDaoApi", addToQueue("youdao"));
router.get("/baiDuApi", addToQueue("baidu"));

module.exports = router;