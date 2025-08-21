import React, { useEffect, useState } from "react";
import {
  CometChatGroupMembers,
  SelectionMode,
} from "@cometchat/chat-uikit-react";
import { CometChat, Group } from "@cometchat/chat-sdk-javascript";

const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search);
  const selectionModeParam = params.get("selectionMode");

  let selectionMode: SelectionMode = SelectionMode.none;
  if (selectionModeParam === "multiple") selectionMode = SelectionMode.multiple;
  if (selectionModeParam === "single") selectionMode = SelectionMode.single;

  return {
    hideSearch: params.get("hideSearch") === "true",
    hideKickMemberOption: params.get("hideKickMemberOption") === "true",
    hideBanMemberOption: params.get("hideBanMemberOption") === "true",
    hideScopeChangeOption: params.get("hideScopeChangeOption") === "true",
    hideUserStatus: params.get("hideUserStatus") === "true",
    selectionMode,
    key: params.toString(),
  };
};

const TestGroupMembers: React.FC = () => {
  const [config, setConfig] = useState(getSearchParams());
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const user = await CometChat.getLoggedinUser();
        if (!user) throw new Error("User not logged in");

        const groupsRequest = new CometChat.GroupsRequestBuilder().setLimit(50).build();
        const allGroups = await groupsRequest.fetchNext();

        for (const grp of allGroups) {
          const membersRequest = new CometChat.GroupMembersRequestBuilder(grp.getGuid())
            .setLimit(50)
            .build();
          const members = await membersRequest.fetchNext();

          const me = members.find(m => m.getUid() === user.getUid());
          if (me && (me.getScope() === CometChat.GROUP_MEMBER_SCOPE.ADMIN || me.getScope() === CometChat.GROUP_MEMBER_SCOPE.OWNER)) {
            setGroup(grp);
            return;
          }
        }

        setGroup(null); // No group where user is admin/owner
      } catch (error) {
        console.error("Error fetching group members:", error);
        setGroup(null);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }} key={config.key}>
      {group ? (
        <CometChatGroupMembers
          group={group}
          selectionMode={config.selectionMode}
          hideSearch={config.hideSearch}
          hideKickMemberOption={config.hideKickMemberOption}
          hideBanMemberOption={config.hideBanMemberOption}
          hideScopeChangeOption={config.hideScopeChangeOption}
          hideUserStatus={config.hideUserStatus}
        />
      ) : (
        <p style={{ padding: "1rem" }}>No group found where you are an admin or owner.</p>
      )}
    </div>
  );
};

export default TestGroupMembers;
