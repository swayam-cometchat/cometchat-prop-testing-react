import React, { act } from "react";
import { CometChatGroups, SelectionMode  } from "@cometchat/chat-uikit-react";
import { CometChat }from "@cometchat/chat-sdk-javascript";

const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search);
  const selectionModeParam = params.get("selectionMode");
   const chatGroup = params.get("chatGroup");
 
  
  return {
    hideGrupType: params.get("hideGroupType") === "true",
    hideSearch: params.get("hideSearch") === "true",
    chatGroup:chatGroup,
    selectionMode:
      selectionModeParam === "multiple"
        ? SelectionMode.multiple
        : selectionModeParam === "single"
        ? SelectionMode.single
        : SelectionMode.none,
    key: params.toString(),
    activeGroups: null,
  };
};

const Groups: React.FC = () => {
  const [config, setConfig] = React.useState(getSearchParams());
  const [activeGroup, setActiveGroup] = React.useState<any>(undefined);


   React.useEffect(() => {
      CometChat.getGroup(config.chatGroup).then(setActiveGroup)
      .catch(console.error);
    }, [config.chatGroup]);


  React.useEffect(() => {
    const handleSearchChange = () => setConfig(getSearchParams());

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event("pushstate"));
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event("replacestate"));
    };

    window.addEventListener("popstate", handleSearchChange);
    window.addEventListener("pushstate", handleSearchChange);
    window.addEventListener("replacestate", handleSearchChange);

    return () => {
      window.removeEventListener("popstate", handleSearchChange);
      window.removeEventListener("pushstate", handleSearchChange);
      window.removeEventListener("replacestate", handleSearchChange);
    };
  }, []);


  return (
    <div style={{ height: "100vh", width: "100%", color:"red" }} key={config.key}>
      <CometChatGroups
         hideSearch={config.hideSearch}
         selectionMode={config.selectionMode}
         activeGroup={activeGroup}
         hideGroupType={config.hideGrupType}
       
      />
    </div>
  );
};

export default Groups;
