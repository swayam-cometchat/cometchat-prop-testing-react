import React from "react";
import TestMessageHeader from "./components/TestMessageHeader";
import TestConversations from "./components/TestConversations";
import TestUsers from "./components/TestUsers";
import TestGroups from "./components/TestGroups";

const App: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const component = queryParams.get("component");

  let ComponentToRender = null;
  switch (component) {
    case "messageHeader":
      ComponentToRender = <TestMessageHeader />;
      break;
    case "conversations":
      ComponentToRender = <TestConversations />;
      break;
    case "users":
      ComponentToRender = <TestUsers />;
      break;
    case "groups":
      ComponentToRender = <TestGroups />;
      break;
    default:
      ComponentToRender = <div>No component selected.</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "80vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 60,
      }}
    >
      {ComponentToRender}
    </div>
  );
};

export default App;
