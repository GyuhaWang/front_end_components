import { Server, OPEN } from "ws";

const wss = new Server({ port: 8080 });
let clients = [];

wss.on("connection", (ws) => {
  console.log("hello");
  clients.push(ws);

  ws.on("message", (message) => {
    // 모든 다른 클라이언트에게 브로드캐스트
    console.log("message:", message.toString());
    clients.forEach((client) => {
      console.log("cilents");
      if (client !== ws && client.readyState === OPEN) {
        console.log("send", message);
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("user left");
    clients = clients.filter((client) => client !== ws);
  });
});

console.log("✅ WebSocket server running on ws://localhost:8080");
