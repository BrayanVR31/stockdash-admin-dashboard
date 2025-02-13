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

/*
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthRoute />} />
        <Route path="/dashboard" element={<ProtectedRouter />}>
          <Route index element={<div>Dashboard</div>} />
          <Route path="account/profile" element={<Profile.Home />} />
          <Route path="products">
            <Route index element={<Product.HomePage />} />
            <Route path="create" element={<Product.RegisterPage />} />
            <Route
              path=":id"
              element={<ProductEdit />}
              loader={async ({ params }) => {
                console.log("loading query on /suppliers/", params);
              }}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
*/

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
    ],
  },
]);

export { router };
