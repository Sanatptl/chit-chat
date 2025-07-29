import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

const useZustandStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isLoading: false,
  isAuthenticated: false,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
      console.log("Checking authentication status...", res.data);
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async function (data) {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res.data.user);
      set({ authUser: res.data.user });
      toast.success("Account created successfully!");
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
      console.log(res.data);
      set({ authUser: res.data.user, isAuthenticated: true });
      toast.success(res.data?.message || "Login successfull!");
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
}));

export default useZustandStore;
