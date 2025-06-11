const fs = require("fs");
const { resolve, sep } = require("path");
const ENV = require("../env");
let { NODE_ENV, NODE_BASE } = ENV;
let env = NODE_ENV === "dev";
// 传入一个html字符串 利用正则把title标签内容过滤出来
const extractTitle = (htmlString) => {
  const titleRegex = /<title>(.*?)<\/title>/;
  const match = htmlString.match(titleRegex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
// 传入一个html字符串 利用正则把所有meta标签过滤出来 返回一个对象 把meta标签name属性当做key，content属性当做value
const extractMetaTags = (htmlString) => {
  const metaTags = {};
  const metaRegex = /<meta\s+name="([^"]+)"\s+content="([^"]+)"\s*\/?>/g;
  let match;
  while ((match = metaRegex.exec(htmlString)) !== null) {
    const name = match[1];
    const content = match[2];
    metaTags[name] = content;
  }
  return metaTags;
};
// 传入一个html字符串 利用正则在任意标签最后面插入一段字符串
function insertStringAfterTag(htmlString, insertString, tagName = "body") {
  const tagRegex = new RegExp(`<${tagName}[^>]*>[\\s\\S]*?<\\/${tagName}>`);
  const match = htmlString.match(tagRegex);

  if (match) {
    const newHtmlString = htmlString.replace(tagRegex, match[0] + insertString);
    return newHtmlString;
  } else {
    return htmlString;
  }
}
// 根据html字符串获取Meat & Title 数据
const getHtmlMeatAndTitle = (html) => {
  //获取页签标题
  const titleText = extractTitle(html);
  const metaMaps = {};
  //获取作者名字与发布时间
  const metaMapsText = extractMetaTags(html);
  for (const [key, val] of Object.entries(metaMapsText)) {
    metaMaps[key.toLocaleLowerCase()] = val;
  }
  const { viewport, keywords, description, author } = metaMaps;
  const [authorText, createdDate] = author.split("~");
  return [titleText, description, authorText, createdDate];
};
// 获取 bodyItem
const getbodyItem = (homeOptions) => {
  return `
            <main class="main">
              <div class="edition">
                <div class="toys">
                ${homeOptions
                  .map((val, index) => {
                    const { key, titleText, text, createdDate } = val;
                    return `<a class="toy slide-enter" style="--enter-stage:${
                      index + 1
                    }; --enter-step: 60ms;" data-to-link=${key} target="_blank" href="/">
                            <div class="toy-title">${titleText}</div>
                            <div class="toy-content">${text}</div>
                            <div class="toy-date">${createdDate}</div>
                          </a>`;
                  })
                  .join("")}
                </div>
              </div>
            </main>
          `;
};
const getPath = (path) => {
  return (__dirname + path).replaceAll("/", sep).replaceAll("\\", sep);
};
let themeGlobal = `
    <link rel="icon" href="${NODE_BASE}/global/img/zl.svg"  type="image/svg+xml" />
    <link rel="stylesheet" href="${NODE_BASE}/global/css/theme.css" />
    <script src="${NODE_BASE}/global/js/plum.js" type="module"></script>
    <script id="theme-script" data-env=${JSON.stringify(
      ENV
    )} src="${NODE_BASE}/global/js/toggle.js"></script>
    `;
// 获取homeHTML
const initHomeHtml = (html, homeOptions) => {
  //head
  html = insertStringAfterTag(html, themeGlobal, "head");
  // body插入
  const jsPath = getPath("/homeScript.js");
  const socketPath = getPath("/htmlSocket.js");
  const js = fs.readFileSync(jsPath, "utf8");
  const socket = env ? fs.readFileSync(socketPath, "utf8") : "";
  const bodyItem = getbodyItem(homeOptions);
  const scriptCode = `
    <canvas class="plum"></canvas>
    <div class="toggle">
      <img src="./global/img/sun.svg" alt="" class="toggle_icon" />
    </div>
    <script defer>${js}${socket}</script>
    `;
  return insertStringAfterTag(html, bodyItem + scriptCode);
};
// 常规html
const initHtml = (html) => {
  //head
  html = insertStringAfterTag(html, themeGlobal, "head");
  // body插入
  const jsPath = getPath("/htmlScript.js");
  const socketPath = getPath("/htmlSocket.js");
  const js = fs.readFileSync(jsPath, "utf8");
  const socket = env ? fs.readFileSync(socketPath, "utf8") : "";
  const scriptCode = `
    <canvas class="plum"></canvas>
    <div class="toggle">
      <img src="./global/img/sun.svg" alt="" class="toggle_icon" />
    </div>
    <script defer>${js}${socket}</script>
    `;
  return insertStringAfterTag(html, scriptCode);
};
module.exports = {
  getHtmlMeatAndTitle,
  initHomeHtml,
  initHtml,
};
