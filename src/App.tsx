import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestConversations from "./components/TestConversations";
import React from "react";
import { User } from "@cometchat/chat-sdk-javascript";
import Users from "./components/Users";

const App: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
    
    <Users/>
    </div>
  );
};

export default App;
