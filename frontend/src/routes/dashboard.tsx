import { RouteObject } from "react-router";
import Layout from "@/layouts/Dashboard/Layout";
import ProtectRoute from "./ProtectRoute";
import { AccountSettings } from "@/features/Account/pages";
import { UserList } from "@/features/User/pages";
import { ProductList, ProductForm } from "@/features/Product/pages";

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
        {
          path: "users",
          children: [{ index: true, element: <UserList /> }],
        },
        {
          path: "products",
          children: [
            { index: true, element: <ProductList /> },
            {
              path: "create",
              element: <ProductForm />,
            },
          ],
        },
      ],
    },
  ],
};

export default dashboardRoute;
