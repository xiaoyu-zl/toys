const fs = require("fs");
const { resolve, sep } = require("path");
const extractTitle = (htmlString) => {
  const titleRegex = /<title>(.*?)<\/title>/;
  const match = htmlString.match(titleRegex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
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
const substringHtml = (html, ruleStart = "<html") => {
  const htmlStareIndex = html.indexOf(ruleStart);
  const headerItem = html.substring(0, htmlStareIndex + ruleStart.length);
  const endHtml = html.substring(
    htmlStareIndex + ruleStart.length,
    html.length,
  );
  return [headerItem, endHtml];
};

const initHtml = (html, homeOptions) => {
  const jsPath = (__dirname + "/localHost.js")
    .replaceAll("/", sep)
    .replaceAll("\\", sep);
  const js = fs.readFileSync(jsPath, "utf8");
  const bodyItem = `
<main class="main">
<div class="edition">
  <div class="toys">
  ${homeOptions
    .map((i) => {
      const { key, titleText, text, createdDate } = i;
      return `<a class="toy" data-to-link=${key} target="_blank" href="/">
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
  const scriptCode = ` <script defer>
${js}
</script>`;
  const [startBody, endBody] = substringHtml(html, "<body>");
  return startBody + bodyItem + scriptCode + endBody;
};
module.exports = {
  getHtmlMeatAndTitle,
  substringHtml,
  initHtml,
};
