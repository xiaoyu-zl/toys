let host = ["localhost", "127.0.0.1"];
const { protocol, host: LocationHost, hostname } = location;
const inHost = `${protocol}//${LocationHost}`;
let prefix = inHost + (host.includes(hostname) ? "" : "/toys");
