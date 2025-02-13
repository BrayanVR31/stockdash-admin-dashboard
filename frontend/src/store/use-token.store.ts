import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenStore {
  token: string | null;
  setToken: (token: string) => void;
}

const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        if (!token) return set({ token: null });
        return set({ token });
      },
    }),
    {
      name: "token",
    },
  ),
);

export { useTokenStore };
