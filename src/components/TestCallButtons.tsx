import React from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatCallButtons } from "@cometchat/chat-uikit-react";


export function TestCallButtons() {
  const [chatUser, setChatUser] = React.useState<CometChat.User>();
  const [chatGroup, setchatGroup] = React.useState<CometChat.Group>();
   const getSearchParams = () => {
      const params = new URLSearchParams(window.location.search);
      const chatGroup = params.get("chatGroup");
      const chatUser = params.get("chatUser");
       
      return {
        chatUser: chatUser,
        chatGroup: chatGroup,  
        hideVoiceCallButton: params.get("hideVoiceCallButton") === "true",
        key: params.toString(),
      };
   };

   React.useEffect(() => {
      const searchParams = getSearchParams();
      console.log("Search Params:", searchParams);
   }, []);
 
  React.useEffect(() => {
    CometChat.getUser("cometchat-uid-1").then((user) => {
      setChatUser(user);
    });
  }, []);
  React.useEffect(() => {
    CometChat.getGroup("cometchat-guid-1").then((group) => {
      setchatGroup(group);
    });
  }, []);

  return chatUser && chatGroup ? (
    <div style={{ width: "50%", height: "100%", justifyContent: "center", alignItems: "center", margin: "250px" }}>
      <CometChatCallButtons 
        group={chatGroup}
        user={chatUser}
        hideVoiceCallButton={getSearchParams().hideVoiceCallButton}
      />
    </div>
  ) : null;
}

export default TestCallButtons;