import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router";
import { AuthRoute } from "./auth-route";
import { ProtectedRouter } from "./protected-router";
import { Profile, Product } from "@/features";
import { ProductEdit } from "@/features/products/product-edit";
import { prefetchProduct } from "@/hooks/use-product";
import { prefetchSupplierList } from "@/hooks/use-supplier";
import { SupplierPage } from "@/features/suppliers/supplier-list";
import { SupplierAdd } from "@/features/suppliers/supplier-add";

const router = createBrowserRouter([
  { path: "/login", element: <AuthRoute /> },
  {
    path: "/dashboard",
    element: <ProtectedRouter />,
    children: [
      {
        path: "products",
        children: [
          { index: true, element: <Product.HomePage /> },
          { path: "create", element: <Product.RegisterPage /> },
          {
            path: ":id",
            element: <ProductEdit />,
            loader: async ({ params }) => {
              const preProduct = prefetchProduct();
              const preSuppliers = prefetchSupplierList();
              await preSuppliers();
              await preProduct(params.id!);
              console.log("loading query on /suppliers/", params);
            },
          },
        ],
      },
      {
        path: "suppliers",
        children: [
          { index: true, element: <SupplierPage /> },
          { path: "create", element: <SupplierAdd /> },
        ],
      },
    ],
  },
]);

export { router };
