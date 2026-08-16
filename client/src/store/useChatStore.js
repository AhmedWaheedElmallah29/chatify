import { create } from "zustand";
import api from "../utils/api";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagedLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await api.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Network error. Please try again later.";
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
}));
