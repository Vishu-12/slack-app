import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/counter/appSlice";

export default function SidebarOption({ title, Icon, addChannelOption, id }) {
  const dispatch = useDispatch();
  const channel = collection(db, "rooms");

  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      try {
        await addDoc(channel, {
          channelName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: " 10px" }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
