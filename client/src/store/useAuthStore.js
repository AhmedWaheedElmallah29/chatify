import { create } from "zustand";
import api from "../utils/api";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({
      isSigningUp: true,
    });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
      toast.error(errorMessage);
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successfully!");
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully!");
      set({ authUser: null });
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
      toast.error(errorMessage);
    }
  },

  updateProfile: async (data) => {
    set({
      isUpdatingProfile: true,
    });
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Updated Profile Successfully!");
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
