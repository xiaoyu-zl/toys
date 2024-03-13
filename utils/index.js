//DEscription title
const getHtmlText = (rules, html) => {
  const [startRule, endRule] = rules;

  const titleStartIndex = html.indexOf(startRule);
  const titleHtml = html.substring(titleStartIndex);
  const titleEndIndex = titleHtml.indexOf(endRule);
  const titleText = titleHtml.substring(startRule.length, titleEndIndex);
  return titleText;
};

const getHtmlMeatAndTitle = (html) => {
  //获取页签标题
  const titleText = getHtmlText(["<title>", "</title>"], html);
  //获取描述内容
  const contentText = getHtmlText(['name="DEscription"', "/>"], html);
  const text = contentText.substring(
    contentText.indexOf('"') + 1,
    contentText.lastIndexOf('"'),
  );
  //获取作者名字与发布时间
  const authorAndCreatedDate = getHtmlText(['name="Author"', "/>"], html);
  const authorAndCreatedDateText = authorAndCreatedDate.substring(
    authorAndCreatedDate.indexOf('"') + 1,
    authorAndCreatedDate.lastIndexOf('"'),
  );
  const [author, createdDate] = authorAndCreatedDateText.split("~");
  return [titleText, text, author, createdDate];
};

const substringHtml = (html) => {
  const ruleStart = "<html";
  const htmlStareIndex = html.indexOf(ruleStart);
  const headerItem = html.substring(0, htmlStareIndex + ruleStart.length);
  const endHtml = html.substring(
    htmlStareIndex + ruleStart.length,
    html.length,
  );
  return [headerItem, endHtml];
};

module.exports = {
  getHtmlMeatAndTitle,
  substringHtml,
};
