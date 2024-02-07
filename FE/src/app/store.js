import { create } from "zustand";

export const useAuthStore = create((set) => ({
  userId: 0,
  setUserId: (arg) => {
    set({ userId: arg });
  },
}));

export const useTokenStore = create((set) => ({
  accessToken: null,
  setAccessToken: (arg) => {
    set({ accessToken: arg });
  },
}));

export const useUserEmailStore = create((set) => ({
  userEmail: null,
  setUserEmail: (arg) => {
    set({ userEmail: arg });
  },
}));

export const useUserNicknameStore = create((set) => ({
  userNickname: null,
  setUserNickname: (arg) => {
    set({ userNickname: arg });
  },
}));

export const useProviderStore = create((set) => ({
  provider: null,
  setProvider: (arg) => {
    set({ provider: arg });
  },
}));
