const { protocol, host } = location;
const inHost = `${protocol}//${host}`;
let prefix = inHost + $env.NODE_BASE;
const linkArrays = document.querySelectorAll("a[data-to-link]");
for (const item of [...linkArrays]) {
  const { toLink } = item.dataset;
  item.href = prefix + toLink;
}
