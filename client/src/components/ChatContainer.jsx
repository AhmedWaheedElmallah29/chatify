import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import { useAuthStore } from "../store/useAuthStore";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const ChatContainer = () => {
  const { selectedUser, messages, getMessagesByUserId, isMessagedLoading } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef();

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
    
    const { subscribeToMessages, unsubscribeFromMessages } = useChatStore.getState();
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [getMessagesByUserId, selectedUser]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 bg-[#1a2130] flex flex-col relative overflow-hidden h-full z-10">
      <ChatHeader />

      {messages.length > 0 && !isMessagedLoading ? (
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-[#1a2130] to-[#111622]">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => {
              const isMine = msg.senderId === authUser._id;
              return (
                <div
                  key={msg._id || index}
                  className={`flex gap-3 w-full ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isMine && (
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex-shrink-0 mt-auto overflow-hidden border border-slate-700/50">
                      <img
                        src={selectedUser?.profilePic || "avatar.png"}
                        alt={selectedUser?.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`flex flex-col max-w-[80%] sm:max-w-[70%] ${
                      isMine ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`relative flex flex-col p-3 shadow-md ${
                        isMine
                          ? "bg-teal-600 text-white rounded-2xl rounded-br-sm"
                          : "bg-[#1e2638] text-slate-200 rounded-2xl rounded-bl-sm border border-slate-700/50"
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Attachment"
                          className="rounded-xl w-full max-w-[260px] h-auto object-cover mb-1.5"
                        />
                      )}

                      {msg.text && (
                        <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      )}

                      <span
                        className={`text-[10px] font-medium mt-1 inline-block self-end ${
                          isMine ? "text-teal-100/80" : "text-slate-400"
                        }`}
                      >
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleDateString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={messageEndRef} />
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
