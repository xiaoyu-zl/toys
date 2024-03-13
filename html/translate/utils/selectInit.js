import { youdao, baidu } from "./selectData.js";
export const selectInit = (fromDom, toDom, api = "youdao") => {
  fromDom.options.length = 0;
  toDom.options.length = 0;
  let { form: f, to: t } = api == "youdao" ? youdao : baidu;
  for (let i = 0; i < f.length; i++) {
    fromDom.add(new Option(f[i].text, f[i].value));
    toDom.add(new Option(t[i].text, t[i].value));
  }
};
