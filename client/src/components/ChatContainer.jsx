import { ArrowLeft } from "lucide-react";

const ChatContainer = () => {
  return (
    <div className="flex-1 bg-[#1a2130] flex flex-col relative overflow-hidden h-full z-10">
      {/* Header Dummy */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-[#1e2638]">
        <div className="flex items-center gap-3">
          {/* Back button for mobile */}
          <button className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-200 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
            alt="John" 
            className="w-10 h-10 rounded-full bg-slate-600"
          />
          <div>
            <h3 className="text-slate-200 font-semibold text-sm">John Doe</h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
      </div>
      
      {/* Messages Dummy */}
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-[#1a2130] to-[#111622]">
        <div className="flex flex-col gap-4">
          <div className="self-start bg-slate-700/80 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-md text-[15px] shadow-sm">
            Hey, how are you doing today?
          </div>
          <div className="self-end bg-teal-600 text-white p-3 rounded-2xl rounded-tr-none max-w-md text-[15px] shadow-sm">
            I'm doing great! Just working on a new project. How about you?
          </div>
        </div>
      </div>
      
      {/* Input Dummy */}
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
    </div>
  );
};

export default ChatContainer;
