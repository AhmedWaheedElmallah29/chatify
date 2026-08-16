import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import ChatItem from "./ChatItem";
import { Search } from "lucide-react";

const ContactList = () => {
  const { isUsersLoading, getUser, searchedUser, setSearchedUser } = useChatStore();
  const [email, setEmail] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSearchAttempted(true);
      await getUser(email.trim());
    }
  };

  const handleClear = () => {
    setEmail("");
    setSearchedUser(null);
    setSearchAttempted(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search user by email..."
          value={email}
          onChange={(e) => {
             setEmail(e.target.value);
             setSearchAttempted(false);
          }}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
          disabled={isUsersLoading}
        >
          <Search size={20} />
        </button>
      </form>

      {email && searchedUser && (
        <button 
          onClick={handleClear}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          Clear search results
        </button>
      )}

      {isUsersLoading && <UsersLoadingSkeleton />}

      {!isUsersLoading && searchedUser && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-slate-400 mb-2 uppercase px-2">Result</h3>
          <ChatItem chat={searchedUser} />
        </div>
      )}

      {!isUsersLoading && !searchedUser && searchAttempted && (
        <div className="text-center text-slate-500 mt-10 text-sm">
          No user found. Search by exact email.
        </div>
      )}
    </div>
  );
};

export default ContactList;
