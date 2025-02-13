import { Outlet, Navigate } from "react-router";
import { useTokenStore } from "@/store";
import { Layout } from "@/features";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/dashboard-sidebar";

function ProtectedRouter() {
  const token = useTokenStore((state) => state.token);
  return token ? <Panel /> : <Navigate to="/login" />;
}

function Panel() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Layout>
        <Outlet />
      </Layout>
    </SidebarProvider>
  );
}

export { ProtectedRouter };
