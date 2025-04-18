import { create } from "zustand";
import { ErrorInfo } from "@/types/error";

type SystemErrorState = {
  error: ErrorInfo;
};

type SystemErrorActions = {
  updateError: (error: ErrorInfo) => void;
};

type SystemErrorStore = SystemErrorState & SystemErrorActions;

export const useSystemErrorStore = create<SystemErrorStore>()((set) => ({
  error: {
    type: "none",
    ilustration: "",
    message: "",
  },
  updateError: (error) =>
    set((state) => ({
      ...state,
      error: { ...error },
    })),
}));
