import { useAuthStore } from "../store/useAuthStore";

const Chat = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Chat;
