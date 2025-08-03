"use client";

import { connectCheck, protectedCheck } from "@/actions/connect";
import { useState } from "react";

export function ServerConnectionCheckButton() {
  const [responseMessage, setResponseMessage] = useState("");
  const handleClickButton = async () => {
    setResponseMessage("요청중...");
    try {
      const message = await connectCheck();
      setResponseMessage(message.toString());
    } catch (e) {
      setResponseMessage("error");
    }
  };
  return (
    <button onClick={handleClickButton}>server check{responseMessage}</button>
  );
}

export function ServerProtectedCheckButton() {
  const [responseMessage, setResponseMessage] = useState("");
  const handleClickButton = async () => {
    setResponseMessage("요청중...");
    try {
      const message = await protectedCheck();
      setResponseMessage(message.toString());
    } catch (e) {
      setResponseMessage("error");
    }
  };
  return (
    <button onClick={handleClickButton}>
      protected check{responseMessage}
    </button>
  );
}
