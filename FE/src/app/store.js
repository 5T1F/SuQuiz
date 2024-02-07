import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      userId: 0,
      setUserId: (arg) => {
        set({ userId: arg });
      },
    }),
    {
      name: "idStorage",
    }
  )
);

export const useTokenStore = create(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (arg) => {
        set({ accessToken: arg });
      },
    }),
    {
      name: "tokenStorage",
    }
  )
);

export const useUserEmailStore = create(
  persist(
    (set) => ({
      userEmail: null,
      setUserEmail: (arg) => {
        set({ userEmail: arg });
      },
    }),
    {
      name: "emailStorage",
    }
  )
);

export const useUserNicknameStore = create(
  persist(
    (set) => ({
      userNickname: null,
      setUserNickname: (arg) => {
        set({ userNickname: arg });
      },
    }),
    {
      name: "nicknameStorage",
    }
  )
);

export const useProviderStore = create(
  persist(
    (set) => ({
      provider: null,
      setProvider: (arg) => {
        set({ provider: arg });
      },
    }),
    {
      name: "providerStorage",
    }
  )
);
