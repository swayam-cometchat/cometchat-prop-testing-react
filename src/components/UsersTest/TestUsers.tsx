import React from "react";
import {CometChatUsers,SelectionMode,} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search);
  const selectionModeParam = params.get("selectionMode");
  const chatUser = params.get("chatUser");

  let selectionMode: SelectionMode = SelectionMode.none;
  if (selectionModeParam === "multiple") {
    selectionMode = SelectionMode.multiple;
  }
  if (selectionModeParam === "single") {
    selectionMode = SelectionMode.single;
  }
  

  return {
    hideUserStatus: params.get("hideUserStatus") === "true",
    hideSearch: params.get("hideSearch") === "true",
    showSectionHeader: params.get("showSectionHeader") === "true",
    chatUser: chatUser,
    selectionMode,
    key: params.toString(), 
    activeUsers: null, 
  
  };
};


const TestUsers: React.FC = () => {
  const [config, setConfig] = React.useState(getSearchParams());
  const [activeUsers, setActiveUsers] = React.useState<any>(undefined);

  React.useEffect(() => {
    const handleSearchChange = () => setConfig(getSearchParams());

    window.addEventListener("popstate", handleSearchChange);
    window.addEventListener("pushstate", handleSearchChange);
    window.addEventListener("replacestate", handleSearchChange);

    return () => {
      window.removeEventListener("popstate", handleSearchChange);
      window.removeEventListener("pushstate", handleSearchChange);
      window.removeEventListener("replacestate", handleSearchChange);
    };
  }, []);

  React.useEffect(() => {
    if (config.chatUser) {
      CometChat.getUser(config.chatUser)
        .then(setActiveUsers)
        .catch(console.error);
    }
  }, [config.chatUser]);
 


  return (
    <div style={{ height: "100vh", width: "100%" }} key={config.key}>
      <CometChatUsers
       
        hideSearch={config.hideSearch}
       hideUserStatus={config.hideUserStatus}
        selectionMode={config.selectionMode}
        activeUser={activeUsers}
        showSectionHeader={config.showSectionHeader}
       
        
        />
    </div>
  );
};

export default TestUsers;
