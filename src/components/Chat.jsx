import InfoOutlined from "@mui/icons-material/InfoOutlined";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SelectRoomId } from "../features/counter/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

export default function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(SelectRoomId);
  const [roomDetails] = useDocument(roomId && doc(db, "rooms", roomId));
  const [roomMessage, loading] = useCollection(
    roomId &&
      query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      )
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessage && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().channelName}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
        </>
      )}
      <ChatMessages>
        {roomMessage?.docs.map((doc) => {
          const { text, timestamp, user, userImage } = doc.data();

          return (
            <Message
              key={doc.id}
              message={text}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
            />
          );
        })}
        <ChatBottom ref={chatRef} />
      </ChatMessages>

      <ChatInput
        chatRef={chatRef}
        channelName={roomDetails?.data().channelName}
        channelId={roomId}
      />
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
