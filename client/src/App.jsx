import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import { useChatStore } from "./store/useChatStore";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  if (!authUser) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const GuestRoute = () => {
  const { authUser } = useAuthStore();
  if (authUser) return <Navigate to="/" replace />;
  return <Outlet />;
};

const App = () => {
  const { checkAuth, isCheckingAuth, authUser, connectSocket, disconnectSocket } = useAuthStore();
  const { subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      connectSocket();
      subscribeToMessages();
    } else {
      disconnectSocket();
      unsubscribeFromMessages();
    }
  }, [authUser, connectSocket, disconnectSocket, subscribeToMessages, unsubscribeFromMessages]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Chat />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
