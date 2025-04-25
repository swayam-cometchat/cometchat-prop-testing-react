import React, { act } from "react";
import { CometChatUsers, SelectionMode } from "@cometchat/chat-uikit-react";
import { CometChat }from "@cometchat/chat-sdk-javascript";
const getSearchParams = () => {
const params = new URLSearchParams(window.location.search);
const selectionModeParam = params.get("selectionMode");
const chatUser = params.get("chatUser");
const searchKeyword = params.get("searchKeyword") || " ";
  return {
    hideUserStatus: params.get("hideUserStatus") === "true",
    hideUsertype: params.get("hideUsertype") === "true",
    hideSearch: params.get("hideSearch") === "true",
    headerView: params.get("headerView") === "true",
    showSectionHeader: params.get("showSectionHeader") === "true",
    searchKeyword:params.get(searchKeyword),
    chatUser: chatUser, 
    selectionMode:
      selectionModeParam === "multiple"
        ? SelectionMode.multiple
        : selectionModeParam === "single"
        ? SelectionMode.single
        : SelectionMode.none,
    key: params.toString(),
    activeUsers: null, 
  };
};

const Users: React.FC = () => {
  const [config, setConfig] = React.useState(getSearchParams());
  const [activeUser, setActiveUser] = React.useState<any>(undefined);


  React.useEffect(() => {
      CometChat.getUser(config.chatUser).then(setActiveUser)
      .catch(console.error);
    }, [config.chatUser]);


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
      <CometChatUsers
         hideUserStatus={config.hideUserStatus}
         hideSearch={config.hideSearch}
         selectionMode={config.selectionMode}
         activeUser={activeUser}
         showSectionHeader={config.showSectionHeader}
        searchKeyword={config.searchKeyword ?? " "}
  

       
      />
    </div>
  );
};

export default Users;
