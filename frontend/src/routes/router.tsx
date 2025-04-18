import { Routes, Route, createBrowserRouter, Navigate } from "react-router";
import { useEffect } from "react";
import "@/App.css";
import { useSystemStore } from "@/store/systemStore";
import ProtectRoute from "@/routes/ProtectRoute";
import Layout from "@/Layout";
import {
  SuppliersAdd,
  SuppliersList,
  SupplierForm,
} from "@/features/suppliers/pages";
import { supplierLoader } from "@/features/suppliers/loader";
import { LoginPage } from "@/features/login";
import { useSplitRoute } from "@/hooks/useSplitRoute";
import Header from "@/components/Header";

interface MatchTitle {
  [path: string]: string;
}

const matchTitleByPage: MatchTitle = {
  suppliers: "Proveedores",
  "suppliers-create": "Proveedores",
  products: "Productos",
  "products-create": "Productos",
  purchases: "Compras",
  "purchases-create": "Compras",
  sales: "Ventas",
  "sales-create": "Ventas",
  users: "Usuarios",
  "users-create": "Usuarios",
};
/*
const Router = () => {
  const setPageTitle = useSystemStore((state) => state.setPageTitle);
  const splitRoute = useSplitRoute();
  useEffect(() => {
    setPageTitle(matchTitleByPage[splitRoute.joined]);
  }, [splitRoute]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<ProtectRoute />}>
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<h1>Dashboard page</h1>} />
          <Route path="products">
            <Route index element={<Header />} />
            <Route path="form" element={<Header />} />
          </Route>
          <Route path="purchases" element={<Header />} />
          <Route path="sales" element={<Header />} />
          <Route path="suppliers">
            <Route index element={<SuppliersList />} />
            <Route path="form" element={<SupplierForm />} />
            <Route path="form/:id" element={<SupplierForm />} />
          </Route>
          <Route path="users" element={<Header />} />
        </Route>
      </Route>
    </Routes>
  );
};
*/

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ProtectRoute />,
    children: [
      {
        path: "*",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <h1>Dashboard page</h1>,
          },
          {
            path: "suppliers",
            children: [
              { index: true, element: <SuppliersList /> },
              {
                path: "form",
                element: <SupplierForm />,
              },
              {
                path: "form/:id",
                element: <SupplierForm />,
                loader: supplierLoader,
                HydrateFallback: () => null,
                ErrorBoundary: () => <div>Error</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
