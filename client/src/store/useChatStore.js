import { create } from "zustand";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  chats: [],
  messages: [],
  unreadCounts: {},
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagedLoading: false,
  searchedUser: null,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setSearchedUser: (user) => set({ searchedUser: user }),

  getUser: async (email) => {
    set({ isUsersLoading: true, searchedUser: null });
    try {
      const res = await api.get(`/message/contacts/${email}`);
      set({ searchedUser: res.data });
    } catch (error) {
      set({ searchedUser: null });
      const errorMessage =
        error.response?.data?.message || "User not found.";
      toast.error(errorMessage);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await api.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
      toast.error(errorMessage);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getUnreadCounts: async () => {
    try {
      const res = await api.get("/message/unread");
      set({ unreadCounts: res.data });
    } catch (error) {
      console.error("Failed to fetch unread counts", error);
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagedLoading: true });
    try {
      const res = await api.get(`/message/${userId}`);
      set((state) => ({ 
        messages: res.data,
        unreadCounts: { ...state.unreadCounts, [userId]: 0 }
      }));
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
      toast.error(errorMessage);
    } finally {
      set({ isMessagedLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });
    try {
      const res = await api.post(`/message/${selectedUser._id}`, messageData);
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      set({ messages: messages });
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
      toast.error(errorMessage);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Prevent duplicate listeners
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, isSoundEnabled } = get();
      
      if (isSoundEnabled) {
        const audio = new Audio("/sounds/notification.mp3");
        audio.volume = 1.0;
        audio.play().catch((err) => console.log("Audio play failed:", err));
      }

      if (newMessage.senderId !== selectedUser?._id) {
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [newMessage.senderId]: (state.unreadCounts[newMessage.senderId] || 0) + 1,
          },
        }));
        return;
      }
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    
    socket.off("newMessage");
  },
}));
