import { Tab } from "./model";
import { useTab } from "./use-tab";

function TabItem({ label, icon, refId }: Tab) {
  const { currentTab, setCurrentTab } = useTab();
  return (
    <li className="tab-item">
      <a
        onClick={() => setCurrentTab(refId)}
        className={`tab ${currentTab === refId ? "tab-active" : "tab-inactive"}`}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
}

export { TabItem };
