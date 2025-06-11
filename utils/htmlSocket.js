const wsUrl = inHost
  ? `ws://${host + $env.NODE_BASE}`
  : `wss://${host + $env.NODE_BASE}`;
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
