import { create } from "zustand";

interface SysStore {
  pageTitle: string;
}

interface SysActions {
  setPageTitle: (title: string) => void;
}

export const useSystemStore = create<SysStore & SysActions>()((set) => ({
  pageTitle: "",
  setPageTitle: (pageTitle) =>
    set((state) => ({
      ...state,
      pageTitle,
    })),
}));
