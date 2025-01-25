import { ReactNode } from "react";
import "./styles.css";
import { Tab } from "./model";
import { TabItem } from "./tab-item";
import { TabProvider } from "./tab-provider";

// Types
interface Props {
  tabs: Tab[];
  initialTab: string;
  children: ReactNode;
}

/**
 * This component receives an array of tabs with the reference to
 * id attribute, each id it's related with content to render
 * on each tab content.
 */
function NavTabs({ tabs, children, initialTab }: Props) {
  return (
    <TabProvider defaultTab={initialTab}>
      <div>
        <nav>
          {/** Tab list */}
          <ul className="flex gap-x-8 border-b border-slate-400">
            {tabs.map((tab, index) => (
              <TabItem key={`tab-item-${index}`} {...tab} />
            ))}
          </ul>
        </nav>
        {/** Tab content */}
        <div>{children}</div>
      </div>
    </TabProvider>
  );
}

export { NavTabs };
