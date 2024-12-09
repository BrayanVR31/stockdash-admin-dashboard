import { CSSProperties } from "react";
import "./index.css";
import { Sidebar } from "./components";

// Types
interface CSSStyles extends CSSProperties {
  "--sidebar-w"?: string;
}

export function Dashboard() {
  // Inline styles
  const layoutStyles: CSSStyles = {
    "--sidebar-w": "320px",
  };
  return (
    <div
      data-dashboard-layout=""
      style={layoutStyles}
      className="w-full min-h-screen"
    >
      <Sidebar />
      <div data-dashboard-content className="w-full">
        <h1>Dashboard page</h1>
      </div>
    </div>
  );
}
