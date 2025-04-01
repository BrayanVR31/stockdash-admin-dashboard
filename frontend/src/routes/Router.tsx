import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useSystemStore } from "@/store/systemStore";
import ProtectRoute from "@/routes/ProtectRoute";
import Layout from "@/Layout";
import { SuppliersAdd, SuppliersList } from "@/features/suppliers/pages";
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
            <Route path="create" element={<Header />} />
          </Route>
          <Route path="purchases" element={<Header />} />
          <Route path="sales" element={<Header />} />
          <Route path="suppliers">
            <Route index element={<SuppliersList />} />
            <Route path="create" element={<SuppliersAdd />} />
          </Route>
          <Route path="users" element={<Header />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
