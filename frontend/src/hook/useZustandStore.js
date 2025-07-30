import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3004";
const useZustandStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isAuthenticated: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data.user });

      console.log("Checking authentication status...", res.data);
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async function (data) {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data.user });
      toast.success("Account created successfully!");

      get().connectSocket();
    } catch (error) {
      console.log(
        error.response?.data?.message || error.response?.data || "Signup failed"
      );
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async function (data) {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data.user, isAuthenticated: true });
      toast.success(res.data?.message || "Login successfull!");

      get().connectSocket();
    } catch (error) {
      console.log(
        error.response?.message || error.response?.data || "Login failed"
      );
      toast.error(error.response?.data || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async function () {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (err) {
      console.log(err);
      toast.error("couldn't logout.. try again!");
    }
  },

  updateProfile: async function (data) {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data?.updatedUser });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, { query: { userID: authUser._id } });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

export default useZustandStore;
