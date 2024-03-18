const argvs = process.argv.find((i) => i.includes("NODE_ENV"));
let NODE_ENV = "dev";
if (!!argvs) {
  NODE_ENV = argvs.split("=")[1];
}



module.exports = {
  NODE_ENV
};
