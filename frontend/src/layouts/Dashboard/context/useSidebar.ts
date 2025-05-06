import { useContext } from "react";
import { SidebarContext } from "./context";

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar hook must be wrapped into sidebar provider.");
  return context;
};

export { useSidebar };
