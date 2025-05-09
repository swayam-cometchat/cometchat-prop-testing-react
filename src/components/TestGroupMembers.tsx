import React from "react";
import {CometChatGroupMembers, SelectionMode,} from "@cometchat/chat-uikit-react";
import { CometChat, Group } from "@cometchat/chat-sdk-javascript";

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
    hideKickMemberOption: params.get("hideKickMemberOption") === "true",
    hideBanMemberOption: params.get("hideBanMemberOption") === "true",
    hideScopeChangeOption: params.get("hideScopeChangeOption") === "true",
    hideUserStatus: params.get("hideUserStatus") === "true",
    chatGroup: chatGroup,
    selectionMode,
    key: params.toString(), 
    activeGroups: null, 
  
  };
};


const TestGroupMembers: React.FC = () => {
  const [config, setConfig] = React.useState(getSearchParams());
  const [] = React.useState<Group | null>(null);
  const [chatGroup, setChatGroup] = React.useState<CometChat.Group>();
  
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
    CometChat.getGroup("group_1746780778858").then((group) => {
      console.log("Group fetched:", group);
      setChatGroup(group);
    }).catch((error) => {
      console.error("Error fetching group:", error);
    });
  }, []);
  
 
  return <>{chatGroup && <CometChatGroupMembers group={chatGroup} 
 
          hideSearch={config.hideSearch}
          selectionMode={config.selectionMode}
          hideKickMemberOption={config.hideKickMemberOption}
          hideBanMemberOption={config.hideBanMemberOption}
          hideScopeChangeOption={config.hideScopeChangeOption}
          hideUserStatus={config.hideUserStatus}
  
  />}</>;

};

export default TestGroupMembers;
