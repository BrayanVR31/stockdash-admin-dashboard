import { RouteObject } from "react-router";
import Layout from "@/layouts/Dashboard/Layout";
import ProtectRoute from "./ProtectRoute";
import { AccountSettings } from "@/features/Account/pages";

const dashboardRoute: RouteObject = {
  path: "/dashboard",
  element: <ProtectRoute />,
  children: [
    {
      element: <Layout />,
      children: [
        { index: true, element: <div>Dashboard</div> },
        {
          path: "account",
          element: <AccountSettings />,
        },
      ],
    },
  ],
};

export default dashboardRoute;
