import { ReactNode } from "react";

interface Tab {
  label: string;
  icon?: ReactNode;
  refId: string;
}

interface TabCtxState {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export type { Tab, TabCtxState };
