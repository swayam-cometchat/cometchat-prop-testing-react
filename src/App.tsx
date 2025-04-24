import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestConversations from "./components/TestConversations";
import React from "react";
import Users from "./components/Users";
import { User } from "@cometchat/chat-sdk-javascript";
import { CometChatMessageHeader, CometChatUsers } from "@cometchat/chat-uikit-react";
import Groups from "./components/Groups";


const App: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Groups />
    </div>
  );
};

export default App;
