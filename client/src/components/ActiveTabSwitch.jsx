import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { setActiveTab, activeTab } = useChatStore();
  return (
    <div className="px-6 py-4">
      <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl">
        {["chats", "search"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all  ${
              activeTab === tab
                ? "bg-[#203642] text-teal-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 "
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActiveTabSwitch;
