import { Outlet, Navigate } from "react-router";
import { useLocalStorage } from "@/hooks";

function ProtectedRouter() {
  const { storageValue: token } = useLocalStorage<string>("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export { ProtectedRouter };
