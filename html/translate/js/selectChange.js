//
import { api } from "./radioChange.js";
import { selectInit } from "../utils/selectInit.js";
let fromDom = document.querySelector("#from");
let toDom = document.querySelector("#to");
let from = "";
let to = "";
let fromText = "";
let toText = "";
const init = () => {
  selectInit(fromDom, toDom, api);
  from = fromDom.options[fromDom.selectedIndex].value;
  to = toDom.options[toDom.selectedIndex].value;
  fromText = fromDom.options[fromDom.selectedIndex].text;
  toText = toDom.options[toDom.selectedIndex].text;
};
fromDom.addEventListener("change", (e) => {
  from = fromDom.options[fromDom.selectedIndex].value;
  fromText = fromDom.options[fromDom.selectedIndex].text;
});
toDom.addEventListener("change", (e) => {
  to = toDom.options[toDom.selectedIndex].value;
  toText = toDom.options[toDom.selectedIndex].text;
});

window.addEventListener('load', function() {
  init();

});

export { from, fromText, to, toText, init };
