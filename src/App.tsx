import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestConversations from "./components/TestConversations";
import React from "react";

const App: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
    <TestConversations />
    </div>
  );
};

export default App;
