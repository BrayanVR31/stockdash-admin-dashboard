import { useState } from "react";
import { Outlet } from "react-router";
import useMediaQuery from "@/hooks/useMediaQuery";
import Navbar from "@/components/Navbar";
import {
  Sidebar,
  SidebarProvider,
  useSidebar,
  DockNavigation,
} from "@/components/sidebar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { handlingResponses } from "@/interceptors/errorNetwork";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useSystemErrorStore } from "@/store/systemErrorStore";
import CardError from "@/components/CardError";
import { Table, Column } from "@/components/table";

const Content = () => {
  const { isCollapsed } = useSidebar();
  const systemError = useSystemErrorStore((state) => state.error);
  const updateSysError = useSystemErrorStore((state) => state.updateError);
  const isMobile = useMediaQuery("(max-width: 500px)");
  handlingResponses((error) => {
    console.log("layout component: ", error);
    updateSysError(error);
  });
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
          <ErrorBoundary fallback={<CardError {...systemError} />}>
            <Outlet />
          </ErrorBoundary>
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
