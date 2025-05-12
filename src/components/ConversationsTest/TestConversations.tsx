import React from "react";
import {
  CalendarObject,
  CometChatConversations,
  SelectionMode,
} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
const getSearchParams = () => {
  const params = new URLSearchParams(window.location.search);

  const selectionModeParam = params.get("selectionMode");
  const limitParam = parseInt(params.get("limit") || "30", 10);
  const customDateFormat = params.get("customDateFormat") === "true";
  const conversationWith = params.get("conversationWith");
  const conversationType = params.get("conversationType");

  let selectionMode: SelectionMode = SelectionMode.none;
  if (selectionModeParam === "multiple") {
    selectionMode = SelectionMode.multiple;
  } else if (selectionModeParam === "single") {
    selectionMode = SelectionMode.single;
  }

  return {
    hideUserStatus: params.get("hideUserStatus") === "true",
    hideDeleteConversation: params.get("hideDeleteConversation") === "true",
    hideReceipts: params.get("hideReceipts") === "true",
    hideGroupType: params.get("hideGroupType") === "true",
    customDateFormat,
    limit: limitParam,
    selectionMode,
    conversationWith,
    conversationType,
    key: params.toString(), 
  };
};

function getDateFormat() {
  return new CalendarObject({
    today: `DD MMM, hh:mm A`,
    yesterday: `DD MMM, hh:mm A`,
    otherDays: `DD MMM, hh:mm A`,
  });
}

const TestConversations: React.FC = () => {
  const [config, setConfig] = React.useState(getSearchParams());
  const [activeConversation, setActiveConversation] = React.useState<any>(undefined);

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
    CometChat.getConversation(config.conversationWith!, config.conversationType!)
    .then(setActiveConversation)
        .catch(console.error);
  }, [config.conversationWith, config.conversationType]);

  const requestBuilder = new CometChat.ConversationsRequestBuilder().setLimit(config.limit);

  return (
    <div style={{ height: "100vh", width: "100%" }} key={config.key}>
      <CometChatConversations
        hideUserStatus={config.hideUserStatus}
        hideDeleteConversation={config.hideDeleteConversation}
        hideReceipts={config.hideReceipts}
        hideGroupType={config.hideGroupType}
        selectionMode={config.selectionMode}
        conversationsRequestBuilder={requestBuilder}
        lastMessageDateTimeFormat={config.customDateFormat ? getDateFormat() : undefined}
        activeConversation={activeConversation}
        onItemClick={(conversation: CometChat.Conversation) => {
            console.log(`[onItemClick] ${conversation.getConversationId()}`);
          }}
        // options={(conversation: CometChat.Conversation) => {
        //     return [

        //       new CometChatOption({
        //         iconURL: icon,
        //         title: "Nudge",
        //         onClick: () => {
        //           console.log(`[onOptionClick] ${conversation.getConversationId()}`);
        //         },
        //       }),
        //     ];
        //   }}
        />
    </div>
  );
};

export default TestConversations;
