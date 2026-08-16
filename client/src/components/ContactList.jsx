import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import ChatItem from "./ChatItem";

const ContactList = () => {
  const { isUsersLoading, getAllContacts, allContacts } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <div>no users Found</div>;

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
      {allContacts.map((contact) => (
        <ChatItem key={contact._id} chat={contact} />
      ))}
    </div>
  );
};

export default ContactList;
