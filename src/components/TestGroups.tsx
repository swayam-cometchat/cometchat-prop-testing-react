import React from "react";
import {CometChatGroups,SelectionMode,} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search);
  const selectionModeParam = params.get("selectionMode");
  const chatGroup = params.get("chatGroup");

  let selectionMode: SelectionMode = SelectionMode.none;
  if (selectionModeParam === "multiple") {
    selectionMode = SelectionMode.multiple;
  }
  if (selectionModeParam === "single") {
    selectionMode = SelectionMode.single;
  }
  

  return {
    hideGroupType: params.get("hideGroupType") === "true",
    hideSearch: params.get("hideSearch") === "true",
    chatGroup: chatGroup,
    selectionMode,
    key: params.toString(), 
    activeGroups: null, 
  
  };
};


const TestGroups: React.FC = () => {
  const [config, setConfig] = React.useState(getSearchParams());
  const [activeGroups, setActiveGroups] = React.useState<any>(undefined);

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
    if (config.chatGroup) {
      CometChat.getGroup(config.chatGroup)
        .then(setActiveGroups)
        .catch(console.error);
    }
  }, [config.chatGroup]);
 


  return (
    <div style={{ height: "100vh", width: "100%" }} key={config.key}>
      <CometChatGroups
       
        hideSearch={config.hideSearch}
        hideGroupType={config.hideGroupType}
        selectionMode={config.selectionMode}
        activeGroup={activeGroups}
        
        />
    </div>
  );
};

export default TestGroups;
