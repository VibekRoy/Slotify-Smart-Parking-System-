import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserAuth = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      userName: "",

      login: (name) => set({ isAuthenticated: true, userName: name }),
      logout: () => set({ isAuthenticated: false, userName: "" }),
    }),
    {
      name: "user-auth",
    }
  )
);

export default useUserAuth;
