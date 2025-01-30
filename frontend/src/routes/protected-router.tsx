import { Outlet, Navigate } from "react-router";
import { useLocalStore } from "@/hooks";
import { Layout } from "@/features";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/dashboard-sidebar";

function ProtectedRouter() {
  const { value: token } = useLocalStore<string>({
    key: "token",
    isEncripted: true,
  });
  return token ? (
    <SidebarProvider>
      <AppSidebar />
      <Layout>
        <Outlet />
      </Layout>
    </SidebarProvider>
  ) : (
    <Navigate to="/login" />
  );
}


export { ProtectedRouter };
