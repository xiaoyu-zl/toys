let host = ["localhost", "127.0.0.1"];
const { protocol, host: LocationHost } = location;
const inHost = `${protocol}//${LocationHost}`;
let prefix = inHost + (host.includes(window.location.hostname) ? "" : "/toys");

