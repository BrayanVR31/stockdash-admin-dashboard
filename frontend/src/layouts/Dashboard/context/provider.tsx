import { ReactNode } from "react";
import { SidebarContext, SidebarCtx } from "./context";
import { useContainerQuery } from "@/hooks/useContainerQuery";

interface Props {
  children: ReactNode;
  breakpoint: number; // unit on px
}

export const SidebarProvider = ({ children, breakpoint }: Props) => {
  const { isMatch, containerRef } = useContainerQuery(breakpoint);
  const value: SidebarCtx = {
    isCollapsed: isMatch,
    sidebarRef: containerRef,
  };
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
