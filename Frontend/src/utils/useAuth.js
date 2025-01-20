import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserAuth = create(
  persist((set) => ({
    isAuthenticated: false,
    userName: null,
    userID: null,

    login: (userName, userID) =>
      set({ isAuthenticated: true, userName, userID }),
    logout: () => set({ isAuthenticated: false, userDetails: null }),
  }))
);

export default useUserAuth;
