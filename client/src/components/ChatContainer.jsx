import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import { useAuthStore } from "../store/useAuthStore";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const ChatContainer = () => {
  const { selectedUser, messages, getMessagesByUserId, isMessagedLoading } =
    useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
  }, [getMessagesByUserId, selectedUser]);
  return (
    <div className="flex-1 bg-[#1a2130] flex flex-col relative overflow-hidden h-full z-10">
      <ChatHeader />

      {messages.length > 0 && !isMessagedLoading ? (
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-[#1a2130] to-[#111622]">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}

                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toISOString().slice(11, 16)
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : isMessagedLoading ? (
        <MessagesLoadingSkeleton />
      ) : (
        <NoChatHistoryPlaceholder name={selectedUser.fullName} />
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
