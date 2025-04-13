import { create } from "zustand";

interface ErrorNotificationState {
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
}

const useErrorNotificationStore = create<ErrorNotificationState>((set) => ({
  error: "",
  setError: (error) => set({ error }),
  clearError: () => set({ error: "" }),
}));

export default useErrorNotificationStore;
