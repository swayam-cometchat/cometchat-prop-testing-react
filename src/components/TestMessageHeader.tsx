import React from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatMessageHeader } from "@cometchat/chat-uikit-react";




export function TestMessageHeaderHeader() {
  const [chatUser, setChatUser] = React.useState<CometChat.User>();
  const getSearchParams = () => {
        const params = new URLSearchParams(window.location.search);
        const hideVideoCallButton = params.get('hideVideoCallButton'); 
        const showConversationSummaryButton = params.get('showConversationSummaryButton');
        const hideUserStatus = params.get('hideUserStatus');

       
         return {
            showConversationSummaryButton: showConversationSummaryButton === 'true',
            hideVideoCallButton: hideVideoCallButton === 'true',
            hideUserStatus: hideUserStatus === 'true',
            key: params.toString(),
           
         }
    
    }
  React.useEffect(() => {
    CometChat.getUser("cometchat-uid-1").then((user) => {
      setChatUser(user);
    });
  }, []);

  return chatUser ? (
    <div style={ { width: "50%", height: "100%",  justifyContent:"center" , alignItems:"center",  margin:"250px" } }> 
      <CometChatMessageHeader user={chatUser}
      hideUserStatus={getSearchParams().hideUserStatus}
      hideVideoCallButton={getSearchParams().hideVideoCallButton}
      showConversationSummaryButton={getSearchParams().showConversationSummaryButton}
       //showConversationSummaryButton={true}
        
        />
    </div>
  ) : null;
}

export default TestMessageHeaderHeader;