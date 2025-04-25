import { CometChatGroups, CometChatMessageHeader, CometChatUsers, User, Group } from "@cometchat/chat-uikit-react";
import { useState } from "react";

const MessageHeader = () => {
  const [selectedChat, setSelectedChat] = useState<User | Group | null>(null);

  return (
    <>
      {/* Render the user and group lists */}
      <CometChatUsers onUserClick={(user:"") => setSelectedChat(user)} />
      <CometChatGroups onItemClick={(group: Group) => setSelectedChat(group)} />

      {/* Conditionally render the chat screen */}
      {selectedChat ? (
        <>
          <CometChatMessageHeader
            hideBackButton={false}
             // Display the name of the selected user or group
          />
          {selectedChat.hasOwnProperty("uid") ? (
            // Render user chat screen if selectedChat is a User
            <UserChatScreen user={selectedChat as User} />
          ) : (
            // Render group chat screen if selectedChat is a Group
            <GroupChatScreen group={selectedChat as Group} />
          )}
        </>
      ) : (
        <p>No chat is selected</p>
      )}
    </>
  );
};

// Placeholder components for UserChatScreen and GroupChatScreen
const UserChatScreen = ({ user }: { user: User }) => {
  return <div>Chatting with user: {user.name}</div>;
};

const GroupChatScreen = ({ group }: { group: Group }) => {
  return <div>Chatting in group: {group.name}</div>;
};

export default MessageHeader;