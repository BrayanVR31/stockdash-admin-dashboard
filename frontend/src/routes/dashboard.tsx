import { RouteObject } from "react-router";
import ProtectRoute from "./ProtectRoute";
import RestrictRoute from "@/routes/RestrictRoute";
import { AccountSettings } from "@/features/Account/pages";
import { UserList, UserAdd } from "@/features/User/pages";
import { ProductList, ProductForm } from "@/features/Product/pages";
import { SaleAdd, SaleList, SaleEdit } from "@/features/Sale/pages";
import { SupplierList, SupplierAdd } from "@/features/Supplier/pages";
import { ErrorBoundary } from "react-error-boundary";
import errorApp from "@/components/error/errorApp";
import Dashboard from "@/features/home/pages/Dashboard";
import { PurchaseList } from "@/features/Purchase/pages/PurchaseList";
import { PurchaseForm } from "@/features/Purchase/pages/PurchaseForm";
import { lazy, Suspense } from "react";
import LoadingPage from "@/components/ui/LoadingPage";

const Layout = lazy(() => import("@/layouts/Dashboard/Layout"));

const dashboardRoute: RouteObject = {
  path: "/dashboard",
  element: <ProtectRoute />,
  children: [
    {
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          element: <RestrictRoute />,
          children: [
            { index: true, element: <Dashboard /> },
            {
              path: "account",
              element: <AccountSettings />,
            },
            {
              path: "users",
              children: [
                { index: true, element: <UserList /> },
                {
                  path: "create",
                  element: (
                    <ErrorBoundary fallbackRender={errorApp}>
                      <UserAdd />
                    </ErrorBoundary>
                  ),
                },
              ],
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
            {
              path: "purchases",
              children: [
                { index: true, element: <PurchaseList /> },
                {
                  path: "create",
                  element: <PurchaseForm />,
                },
              ],
            },
            {
              path: "sales",
              children: [
                { index: true, element: <SaleList /> },
                {
                  path: "create",
                  element: <SaleAdd />,
                },
                {
                  path: ":id/edit",
                  element: <SaleEdit />,
                },
              ],
            },
            {
              path: "suppliers",
              children: [
                { index: true, element: <SupplierList /> },
                {
                  path: "create",
                  element: <SupplierAdd />,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default dashboardRoute;
