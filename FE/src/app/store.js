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
      storage: createJSONStorage(() => sessionStorage),
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
      storage: createJSONStorage(() => sessionStorage),
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
      storage: createJSONStorage(() => sessionStorage),
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
      storage: createJSONStorage(() => sessionStorage),
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
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useMultiplayStore = create(
  persist(
    (set) => ({
      resCnt: null,
      setResCnt: (arg) => {
        set({ resCnt: arg });
      },
    }),
    {
      name: "multiplayStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useWordleStore = create((set) => ({
  modalResult: {
    answer: "",
    isSolved: "",
    resultText: "",
    correct: false,
    allTrialCount: 0,
    streak: {},
    solveCount: 0,
    correctCount: 0,
    trialCount: 0,
    maxCorrectCount: 0,
    trialSpread: [0, 0, 0, 0, 0],
    correctRate: 0,
  },
  setModalResult: (modalResult) => set({ modalResult }),
  storage: createJSONStorage(() => sessionStorage),
}));
