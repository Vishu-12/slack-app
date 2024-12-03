import { Button } from "@mui/material";
import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }
    const roomRef = doc(db, "rooms", channelId);
    const messageRef = collection(roomRef, "messages");
    try {
      await addDoc(messageRef, {
        text: input,
        timestamp: new Date(),
        user: user?.displayName,
        userImage: user?.photoURL,
      });

      chatRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
      setInput("");
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };
  return (
    <ChatInputContainer>
      <form action="">
        <input
          value={input}
          placeholder={`Message #${channelName}`}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
