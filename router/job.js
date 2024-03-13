const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

// 初始化OpenAI客户端
const openinit = (baseURL, apiKey) => {
  return new OpenAI({
    baseURL,
    apiKey,
  });
};
let parameter = {
  openURL: "",
  apiKey: "",
};
let openai = null;
function getAskMessage(resumeInfo, jobDescription) {
  return `你好，这是我的简历：${resumeInfo}，这是我所应聘公司的要求：${jobDescription}。我希望您能帮我直接给HR写一个礼貌专业的求职新消息，要求能够用专业的语言将简历中的技能结合应聘工作的描述，来阐述自己的优势，尽最大可能打动招聘者。并且请您始终使用中文来进行消息的编写,开头是招聘负责人。这是一封完整的求职信，不要包含求职信内容以外的东西，例如“根据您上传的求职要求和个人简历，我来帮您起草一封求职邮件：”这一类的内容，以便于我直接自动化复制粘贴发送，字数控制在80字左右为宜`;
}
// 与GPT进行聊天的函数
async function chat(askMessage) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: askMessage,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    // 获取gpt返回的信息
    const formattedMessage = completion.choices[0].message.content.replace(
      /\n/g,
      " ",
    );
    return {
      success: true,
      data: formattedMessage,
    };
  } catch (error) {
    const errorResponse = JSON.stringify({ error: String(error) });
    return {
      success: false,
      data: "",
      message: errorResponse,
    };
  }
}

router.get("/gpt3", async (req, res) => {
  const { openURL, apiKey, resumeInfo, jobDescription } = req.query;
  if (!(openURL === parameter.openURL && apiKey === parameter.apiKey)) {
    parameter = { openURL, apiKey };
    openai = openinit(openURL, apiKey);
  }
  const askMessage = getAskMessage(resumeInfo, jobDescription);
  const data = await chat(askMessage);
  res.send({ ...data });
});

module.exports = router;
