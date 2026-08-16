import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatItem = ({ chat }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isActive = selectedUser?._id === chat._id;
  const isOnline = onlineUsers?.includes(chat._id);

  return (
    <div
      onClick={() => setSelectedUser(chat)}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
        isActive
          ? "bg-[#203642]/60 border-[#2d4957]/50"
          : "hover:bg-slate-700/30 border-transparent"
      }`}
    >
      <div className="relative">
        <img
          src={chat.profilePic || "avatar.png"}
          alt={chat.fullName}
          className="w-10 h-10 rounded-full bg-slate-600 object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-[#1e2638] rounded-full"></span>
        )}
      </div>
      <div className="flex-1">
        <h3
          className={`text-sm font-medium ${
            isActive ? "text-slate-200" : "text-slate-300"
          }`}
        >
          {chat.fullName}
        </h3>
        <p className={`text-xs mt-0.5 ${isOnline ? (isActive ? "text-teal-400" : "text-teal-500/80") : "text-slate-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
