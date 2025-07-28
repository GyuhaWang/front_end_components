"use client";

import { useEffect, useRef, useState } from "react";

export default function SocketPage() {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");
    socketRef.current = socket;

    const handleOpen = () => {
      console.debug("socket opened");
      socket.send("Hello Server!");
    };

    const handleMessage = async (event: MessageEvent) => {
      let dataStr = "";
      if (typeof event.data === "string") {
        dataStr = event.data;
      } else if (event.data instanceof Blob) {
        dataStr = await event.data.text();
      } else {
        dataStr = String(event.data);
      }
      setMessages((prev) => [...prev, dataStr]);
      console.log("Message from server:", dataStr);
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);

    return () => {
      console.debug("page left");
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.close(1000, "user left");
    };
  }, []);

  const handleSubmitForm = (formData: FormData) => {
    const message = formData.get("message") ?? "empty";
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return (
    <div>
      <form action={handleSubmitForm}>
        <input placeholder="socket 전송" name="message" />
        <input type="submit" value="send" />
      </form>
      <div>
        <h3>받은 메시지</h3>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
