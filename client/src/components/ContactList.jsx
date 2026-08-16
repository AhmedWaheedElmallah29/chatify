const ContactList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
      {/* Normal Contact Item */}
      <div className="flex items-center gap-3 p-3 hover:bg-slate-700/30 rounded-xl cursor-pointer transition-all border border-transparent">
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" 
            alt="Alice" 
            className="w-10 h-10 rounded-full bg-slate-600"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-slate-300 text-sm font-medium">Alice Smith</h3>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 hover:bg-slate-700/30 rounded-xl cursor-pointer transition-all border border-transparent">
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" 
            alt="Bob" 
            className="w-10 h-10 rounded-full bg-slate-600"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-slate-300 text-sm font-medium">Bob Johnson</h3>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
