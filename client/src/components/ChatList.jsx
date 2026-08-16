const ChatList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
      {/* Active Chat Item */}
      <div className="flex items-center gap-3 p-3 bg-[#203642]/60 rounded-xl cursor-pointer border border-[#2d4957]/50 transition-all">
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
            alt="John" 
            className="w-10 h-10 rounded-full bg-slate-600"
          />
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1c2e39] rounded-full"></span>
        </div>
        <div className="flex-1">
          <h3 className="text-slate-200 text-sm font-medium">John Doe</h3>
          <p className="text-slate-400 text-xs mt-0.5 truncate">Hey, are we still meeting today?</p>
        </div>
      </div>

      {/* Normal Chat Item */}
      <div className="flex items-center gap-3 p-3 hover:bg-slate-700/30 rounded-xl cursor-pointer transition-all border border-transparent">
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" 
            alt="Emma" 
            className="w-10 h-10 rounded-full bg-slate-600"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-slate-300 text-sm font-medium">Emma Thompson</h3>
          <p className="text-slate-500 text-xs mt-0.5 truncate">Sounds good, talk to you later!</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
