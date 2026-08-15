import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
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
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
