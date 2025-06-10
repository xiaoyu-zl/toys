const ENV = process.argv.find((i) => i.includes("NODE_ENV"));
let NODE_ENV = "dev";
if (!!ENV) {
  NODE_ENV = ENV?.split("=")[1];
}
const BASE = process.argv.find((i) => i.includes("NODE_BASE"));
let NODE_BASE = "";
if (!!BASE) {
  NODE_BASE = BASE?.split("=")[1];
}


module.exports = {
  NODE_ENV,
  NODE_BASE
};
