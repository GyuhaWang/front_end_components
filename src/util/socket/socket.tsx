"use client";

import { useEffect } from "react";

export default function ScoketPage() {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    const handleOpen = (event: Event) => {
      console.debug("socket opened");
      socket.send("Hello Server!");
    };
    const handleMessage = (event: MessageEvent<unknown>) => {
      console.log("Message from server ", event.data);
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

  return (
    <div>
      <input placeholder="socket 전송"></input>
    </div>
  );
}
