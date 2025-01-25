import { useContext, createContext } from "react";
import { TabCtxState } from "./model";

// Context
export const TabCtx = createContext<TabCtxState>({
  currentTab: "",
  setCurrentTab: () => null,
});

// Custom hook
const useTab = () => {
  return useContext(TabCtx);
};

export { useTab };
