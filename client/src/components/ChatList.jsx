import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import ChatItem from "./ChatItem";

const ChatList = () => {
  const { getMyChatPartners, getUnreadCounts, chats, isUsersLoading } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
    getUnreadCounts();
  }, [getMyChatPartners, getUnreadCounts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
      {chats.map((chat) => (
        <ChatItem key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
