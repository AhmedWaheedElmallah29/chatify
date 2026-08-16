import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  useEffect(() => {
    const hadleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", hadleEscKey);

    return () => window.removeEventListener("keydown", hadleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-[#1e2638]">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser?.profilePic || "avatar.png"}
            alt={selectedUser?.fullName}
            className="w-10 h-10 rounded-full bg-slate-600 object-cover"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-[#1e2638] rounded-full"></span>
          )}
        </div>
        <div>
          <h3 className="text-slate-200 font-semibold text-sm">
            {selectedUser?.fullName}
          </h3>
          <p className={`text-xs mt-0.5 ${isOnline ? "text-teal-400" : "text-slate-500"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close button on the right */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
