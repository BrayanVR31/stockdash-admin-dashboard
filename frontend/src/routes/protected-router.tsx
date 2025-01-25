import { Outlet, Navigate } from "react-router";
import { useLocalStore } from "@/hooks";
import { Layout } from "@/features";

function ProtectedRouter() {
  const { value: token } = useLocalStore<string>({
    key: "token",
    isEncripted: true,
  });
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
}

export { ProtectedRouter };
