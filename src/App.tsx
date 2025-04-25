
import React from "react";
import TestGroups from "./components/TestGroups";
import TestUsers from "./components/TestUsers";


//import Users from "./components/Users";



//import TestConversations from "./components/TestConversations";

const App: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <TestUsers/>
      <TestGroups/>
    </div>
  );
};

export default App;
