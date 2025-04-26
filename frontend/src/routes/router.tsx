import { createBrowserRouter, Navigate } from "react-router";
import dashboardRoute from "./dashboard";
import publicRoute from "./public";

const router = createBrowserRouter([
  dashboardRoute,
  publicRoute,
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
]);

export { router };
