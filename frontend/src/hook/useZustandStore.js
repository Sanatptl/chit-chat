import { create } from "zustand";
import axiosInstance from "../utils/axios";

const useZustandStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoading: false,
  isAuthenticated: false,

  checkAuth: async () => {
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
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));

export default useZustandStore;
