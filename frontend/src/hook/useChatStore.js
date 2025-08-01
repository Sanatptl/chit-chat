import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import useZustandStore from "./useZustandStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setSelectedUser: (user) => set({ selectedUser: user }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res?.data?.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userID) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/user/${userID}`);
      set({ messages: res.data?.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Message fetching failed!");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData, userID) => {
    const { messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${userID}`,
        messageData
      );
      set({ messages: [...messages, res.data?.data] });
    } catch (error) {
      console.log(error.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useZustandStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useZustandStore.getState().socket;
    socket.off("newMessage");
  },
}));

export default useChatStore;
