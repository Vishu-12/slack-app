import Create from "@mui/icons-material/Create";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import React from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import InsertComment from "@mui/icons-material/InsertComment";
import Inbox from "@mui/icons-material/Inbox";
import Drafts from "@mui/icons-material/Drafts";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import Apps from "@mui/icons-material/Apps";
import FileCopy from "@mui/icons-material/FileCopy";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Add from "@mui/icons-material/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Sidebar() {
  const [channels] = useCollection(query(collection(getFirestore(), "rooms")));
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Slack</h2>
          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>
      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & reactions" />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
      {channels?.docs.map((doc) => (
        <SidebarOption
          key={doc.id}
          id={doc.id}
          title={doc.data().channelName}
        />
      ))}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    color: green;
    margin-top: 1px;
    margin-right: 2px;
  }
`;
