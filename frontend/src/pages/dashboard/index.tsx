import { CSSProperties } from "react";
import { Outlet } from "react-router";
import "./index.css";
import { Sidebar, Navbar } from "./components";

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
        <main data-dashboard-page className="bg-slate-200/45 min-h-screen">
          <Navbar />
          <div className="px-10 py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
