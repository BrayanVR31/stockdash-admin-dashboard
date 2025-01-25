import { ReactNode, useState } from "react";
import { TabCtxState } from "./model";
import { TabCtx } from "./use-tab";

interface Props {
  children: ReactNode;
  defaultTab: string;
}

// Provider
const TabProvider = ({ children, defaultTab }: Props) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const initValue: TabCtxState = {
    currentTab,
    setCurrentTab,
  };
  return <TabCtx.Provider value={initValue}>{children}</TabCtx.Provider>;
};

export { TabProvider };
