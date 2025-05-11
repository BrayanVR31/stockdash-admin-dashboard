import { Outlet } from "react-router";
import NetworkError from "@/components/error/NetworkError";
import { useAppError } from "@/hooks/useAppError";

const RestrictRoute = () => {
  const error = useAppError();
  if (error) return <NetworkError {...error} />;
  return <Outlet />;
};

export default RestrictRoute;
