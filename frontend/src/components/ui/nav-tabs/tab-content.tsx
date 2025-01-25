import { ReactNode } from "react";
import { useTab } from "./use-tab";

interface Props {
  id: string;
  children: ReactNode;
}

function TabContent({ id, children }: Props) {
  /**
   * TODO: make a HOC component to pass all common styles
   * such as auto-height with grid and id attribute on children
   * element instead of creating div element here.
   */
  const { currentTab } = useTab();
  return currentTab === id && children;
}

export { TabContent };
