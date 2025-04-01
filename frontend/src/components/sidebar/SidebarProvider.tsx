import {
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
  ReactNode,
  useState,
} from "react";

interface SidebarState {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const initialState: SidebarState = {
  isCollapsed: false,
  setIsCollapsed: () => null,
};

const sidebarContext = createContext<SidebarState>(initialState);

interface Props {
  children: ReactNode;
}

const SidebarProvider = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const value: SidebarState = {
    isCollapsed,
    setIsCollapsed,
  };
  return (
    <sidebarContext.Provider value={value}>{children}</sidebarContext.Provider>
  );
};

const useSidebar = () => {
  const context = useContext(sidebarContext);
  if (!context)
    throw new Error("Sidebar context must be wrapped into sidebar provider");
  return context;
};

export { SidebarProvider, useSidebar };
