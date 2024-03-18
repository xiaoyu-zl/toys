let host = ["localhost", "127.0.0.1"];
const { protocol, host: LocationHost, hostname } = location;
const inHost = `${protocol}//${LocationHost}`;
let prefix = inHost + (host.includes(hostname) ? "" : "/toys");
const wsUrl = inHost ? `ws://${LocationHost}` : `wss://${LocationHost}`;

function connectWebSocket() {
  // 连接websocket
  const ws = new WebSocket(`${wsUrl}/reload`);
  ws.onopen = function () {
    console.log("WebSocket opened");
  };
  ws.onclose = function () {
    connectWebSocket(); // 尝试重新连接
  };
  ws.onmessage = function (event) {
    if (event.data === "reload") {
      location.reload(); // 收到刷新消息时，重新加载页面
    }
  };
}

connectWebSocket();
