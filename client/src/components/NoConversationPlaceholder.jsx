import { MessageSquare } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex-1 bg-[#1a2130] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2130] to-[#111622] opacity-80 pointer-events-none"></div>
      
      <div className="flex flex-col items-center text-center max-w-sm z-10 relative">
        {/* Icon Wrapper */}
        <div className="w-20 h-20 bg-[#203642] text-teal-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(45,212,191,0.1)]">
          <MessageSquare size={36} strokeWidth={1.5} />
        </div>
        
        {/* Text */}
        <h2 className="text-slate-100 text-2xl font-semibold mb-3 tracking-wide">Select a conversation</h2>
        <p className="text-slate-400 text-[15px] leading-relaxed">
          Choose a contact from the sidebar to start chatting or continue a previous conversation.
        </p>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;
