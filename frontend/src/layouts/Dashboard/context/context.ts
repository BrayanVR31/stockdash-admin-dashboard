import { createContext, RefObject } from "react";

type SidebarState = {
  isCollapsed: boolean;
  sidebarRef: RefObject<HTMLDivElement | null> | null;
};

export type SidebarCtx = SidebarState;

export const SidebarContext = createContext<SidebarCtx>({
  isCollapsed: false,
  sidebarRef: null,
});
