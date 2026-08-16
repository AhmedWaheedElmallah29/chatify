import { useChatStore } from "../store/useChatStore";

const ChatItem = ({ chat }) => {
  const { selectedUser, setSelectedUser } = useChatStore();

  const isActive = selectedUser?._id === chat._id;

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
      </div>
      <div className="flex-1">
        <h3
          className={`text-sm font-medium ${
            isActive ? "text-slate-200" : "text-slate-300"
          }`}
        >
          {chat.fullName}
        </h3>
        {/* <p className={`text-xs mt-0.5 truncate ${isActive ? "text-slate-400" : "text-slate-500"}`}>
          رسالة تجريبية...
        </p> */}
      </div>
    </div>
  );
};

export default ChatItem;
