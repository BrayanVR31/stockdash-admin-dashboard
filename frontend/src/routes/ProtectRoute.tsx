import { Navigate, Outlet } from "react-router";
import { useAuthenticationStore } from "@/store/authenticationStore";

const ProtectRoute = () => {
  const { isLogged } = useAuthenticationStore();
  if (!isLogged) return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectRoute;
