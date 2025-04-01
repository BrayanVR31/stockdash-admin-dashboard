import { Outlet } from "react-router";
import useMediaQuery from "@/hooks/useMediaQuery";
import Navbar from "@/components/Navbar";
import {
  Sidebar,
  SidebarProvider,
  useSidebar,
  DockNavigation,
} from "@/components/sidebar";

const Content = () => {
  const { isCollapsed } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 500px)");
  return (
    <div
      style={{
        marginLeft:
          (isMobile && "0") ||
          `var(--spacing-sidebar-${isCollapsed ? "min" : "max"}-span)`,
      }}
      className="bg-transparent flex-1 min-h-screen"
    >
      <Navbar />
      {isMobile && <DockNavigation />}
      <div className="min-h-content-peak">
        <div className="px-8 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />
        <Content />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
