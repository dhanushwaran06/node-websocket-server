const WebSocket = require("ws");
const { handleConnection } = require("./websocket");

const wss = new WebSocket.Server({ port: 8081 });
wss.on("connection", (ws) => {
  handleConnection(ws, wss);
});

console.log("WebSocket server is running on ws://localhost:8081");
