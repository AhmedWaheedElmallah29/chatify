import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const Chat = () => {
  const isChatsTabActive = true;
  const isConversationSelected = false;

  return (
    <div className="h-screen w-full bg-[#111827] flex items-center justify-center p-0 md:p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] hidden md:block"></div>

      <div className="w-full h-full md:max-w-[1100px] md:h-[85vh] md:min-h-[600px] bg-[#1a2130] md:rounded-2xl flex overflow-hidden md:shadow-2xl z-10 md:border border-slate-700/30">
        <div
          className={`w-full md:w-80 bg-[#1e2638] flex-col border-r border-slate-700/50 relative z-20 ${
            isConversationSelected ? "hidden md:flex" : "flex"
          }`}
        >
          <ProfileHeader />
          <ActiveTabSwitch />

          {isChatsTabActive ? <ChatList /> : <ContactList />}
        </div>

        <div
          className={`flex-1 w-full ${
            !isConversationSelected ? "hidden md:flex" : "flex"
          }`}
        >
          {isConversationSelected ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
