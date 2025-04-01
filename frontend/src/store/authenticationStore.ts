import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLogged: boolean;
}

interface AuthActions {
  setIsLogged: (status: boolean) => void;
}

export const useAuthenticationStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isLogged: false,
      setIsLogged: (isLogged) =>
        set((state) => ({
          ...state,
          isLogged,
        })),
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
