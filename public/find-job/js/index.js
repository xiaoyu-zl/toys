const gpt3 = async (openURL, apiKey, resumeInfo, jobDescription) => {
  return await fetch(
    `${prefix}/job/gpt3?openURL=${openURL}&apiKey=${apiKey}&resumeInfo=${resumeInfo}&jobDescription=${jobDescription}`,
  ).then((res) => res.json());
};
const color = {
  success: "#7FFFAA", //success
  error: "#DC143C", //error
  warning: "Orange", //warning
};
// 按钮
const send = document.querySelector(".send");
const copy = document.querySelector(".copy");
// 返回结果
const content = document.querySelector(".content");
// 提示框
const prompt = document.querySelector(".prompt");
// 数据
const openURL = document.querySelector(".openURL");
const apiKey = document.querySelector(".apiKey");
const resumeInfo = document.querySelector(".resumeInfo");
const jobDescription = document.querySelector(".jobDescription");

// 信息缓存
const cache = () => {
  // resumeInfo
  localStorage.getItem("resumeInfo") &&
    (resumeInfo.value = localStorage.getItem("resumeInfo"));
  resumeInfo.oninput = () => {
    localStorage.setItem("resumeInfo", resumeInfo.value);
  };
  // url
  openURL.value = localStorage.getItem("openURL")
    ? localStorage.getItem("openURL")
    : "https://api.chatanywhere.com.cn";
  openURL.oninput = () => {
    localStorage.setItem("openURL", openURL.value);
  };
  // key
  localStorage.getItem("apiKey") &&
    (apiKey.value = localStorage.getItem("apiKey"));
  apiKey.oninput = () => {
    localStorage.setItem("apiKey", apiKey.value);
  };
};
cache();
send.onclick = async () => {
  let message = "";
  switch (true) {
    case !openURL.value:
      message = "请提供应api接口";
      break;
    case !apiKey.value:
      message = "请提供应apiKey";
      break;
    case !resumeInfo.value:
      message = "请提供个人简历信息";
      break;
    case !jobDescription.value:
      message = "请提供应聘公司的要求";
      break;
  }
  if (message) {
    showPrompt(message, color["warning"]);
    return;
  }
  const res = await gpt3(
    openURL.value,
    apiKey.value,
    resumeInfo.value,
    jobDescription.value,
  );
  if (res.success) {
    content.innerHTML = res.data;
  } else {
    showPrompt(res.message, color["error"]);
  }
};
copy.onclick = async () => {
  if (!content.innerText) return;
  if (navigator.clipboard && navigator.permissions) {
    try {
      await navigator.clipboard.writeText(content.innerText);
      showPrompt("复制成功", color["success"]);
    } catch (error) {
      showPrompt("复制失败", color["error"]);
    }
  } else {
    showPrompt("当前浏览器版本不支持copyAPI", color["warning"]);
  }
};
const showPrompt = (text, color) => {
  prompt.innerText = text;
  prompt.style.display = "block";
  prompt.style.color = color;
  setTimeout(() => {
    prompt.style.display = "none";
    prompt.innerText = "";
  }, 1500);
};
