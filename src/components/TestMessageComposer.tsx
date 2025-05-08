import React from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatMessageComposer } from "@cometchat/chat-uikit-react";

export function MessageComposerDemo() {
  const [chatUser, setChatUser] = React.useState<CometChat.User>();
  React.useEffect(() => {
    CometChat.getUser("coemetchat-uid-2").then((user) => {
      setChatUser(user);
    });
  }, []);



  
  return chatUser ? (
    <div>
      <CometChatMessageComposer
       user={chatUser}
       
       
       />
    </div>
  ) : null;
}