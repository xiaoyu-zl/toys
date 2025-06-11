const { protocol, host } = location;
const inHost = `${protocol}//${host}`;
let prefix = inHost + $env.NODE_BASE;
