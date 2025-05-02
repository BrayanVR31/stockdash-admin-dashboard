import { create } from "zustand";
import { ErrorDescription } from "@/types/error";

type SystemErrorState = {
  error: ErrorDescription | null;
};
type SystemErrorActions = {
  setSystemError: (error: ErrorDescription) => void;
  resetSystemError: () => void;
};

export const useSystemError = create<SystemErrorState & SystemErrorActions>(
  (set) => ({
    error: null,
    setSystemError: (error: ErrorDescription) => set({ error }),
    resetSystemError: () => set({ error: null }),
  })
);
