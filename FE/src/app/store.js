import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (nickname) => {
    set({ user: nickname });
  },
}));
