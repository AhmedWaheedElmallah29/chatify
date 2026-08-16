const MessageInput = () => {
  return (
    <div className="p-4 bg-[#1e2638] border-t border-slate-700/50">
      <div className="bg-slate-700/50 rounded-full flex items-center px-4 py-2.5 border border-slate-600/30">
        <input
          type="text"
          placeholder="Type a message..."
          className="bg-transparent flex-1 text-sm text-slate-200 outline-none placeholder:text-slate-400"
        />
        <button className="text-teal-400 font-medium text-sm ml-3 px-3 py-1.5 hover:bg-teal-400/10 rounded-lg transition-colors">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
