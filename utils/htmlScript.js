let host = ["localhost", "127.0.0.1"];
const { protocol, host: LocationHost, hostname } = location;
const inHost = `${protocol}//${LocationHost}`;
let prefix = inHost + (host.includes(hostname) ? "" : "/toys");
let themeCss = `
    <link rel="icon" href="${prefix}/home/img/zl.svg"  type="image/svg+xml" />
    <link rel="stylesheet" href="${prefix}/home/css/theme.css" />
    `;
document.head.insertAdjacentHTML("beforeend", themeCss);
let plumSvg = prefix + "/home/img/sun.svg";
let plumDarkHtml = `
    <canvas class="plum"></canvas>
    <div class="toggle">
      <img src="${plumSvg}" alt="" class="toggle_icon" />
    </div>
    `;
document.body.insertAdjacentHTML("afterbegin", plumDarkHtml);

const plum = document.createElement("script");
plum.src = prefix + "/home/js/plum.js";
plum.type = "module";
document.body.appendChild(plum);
const toggleScript = document.createElement("script");
toggleScript.src = prefix + "/home/js/toggle.js";
document.body.appendChild(toggleScript);
