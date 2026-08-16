const ActiveTabSwitch = () => {
  return (
    <div className="px-6 py-4">
      <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl">
        <button className="flex-1 py-2 bg-[#203642] text-teal-400 rounded-lg text-sm font-medium transition-all shadow-sm">
          Chats
        </button>
        <button className="flex-1 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 rounded-lg text-sm font-medium transition-all">
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;
