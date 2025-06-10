let host = ["localhost", "127.0.0.1"];
const { protocol, host: LocationHost } = location;
const inHost = `${protocol}//${LocationHost}`;
let prefix = inHost + (host.includes(window.location.hostname) ? "" : "/toys");
const linkArrays = document.querySelectorAll("a[data-to-link]");
for (const item of [...linkArrays]) {
  const { toLink } = item.dataset;
  item.href = prefix + toLink + "/";
}
const link = document.createElement("link");
link.href = prefix + "/home/img/zl.svg";
link.rel = "icon";
link.type = "image/svg+xml";
document.head.appendChild(link);


