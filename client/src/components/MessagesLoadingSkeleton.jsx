function MessagesLoadingSkeleton() {
  // أحجام مختلفة عشان شكل الرسايل يبان طبيعي
  const widths = ["w-[150px]", "w-[250px]", "w-[200px]", "w-[180px]", "w-[280px]", "w-[120px]"];

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-[#1a2130] to-[#111622] space-y-4 w-full h-full">
      {[...Array(6)].map((_, index) => {
        const isStart = index % 2 === 0;
        return (
          <div
            key={index}
            className={`chat ${isStart ? "chat-start" : "chat-end"} animate-pulse`}
          >
            {/* Avatar Skeleton */}
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-slate-700/50"></div>
            </div>
            
            {/* Bubble Skeleton */}
            <div
              className={`chat-bubble ${widths[index]} h-12 ${
                isStart ? "bg-slate-800/60" : "bg-cyan-700/40"
              } rounded-2xl ${isStart ? "rounded-tl-none" : "rounded-tr-none"} mt-1`}
            ></div>
            
            {/* Time Skeleton */}
            <div className="chat-footer mt-1">
              <div className="h-3 w-12 bg-slate-700/50 rounded mt-1"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessagesLoadingSkeleton;
