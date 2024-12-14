import { Routes, Route } from "react-router";
import { SignIn, Dashboard, Products, Suppliers } from "@pages";

export function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<h1>Main dashboard</h1>} />
        {/** Product route */}
        <Route path="products">
          <Route index element={<Products.Home />} />
          <Route path="create" element={<h2>Product create</h2>} />
        </Route>
        {/** Purchases route */}
        <Route path="purchases">
          <Route index element={<h2>Purchases list</h2>} />
          <Route path="create" element={<h2>Purchase create</h2>} />
        </Route>
        {/** Suppliers route */}
        <Route path="suppliers">
          <Route index element={<Suppliers.Home />} />
          <Route path="create" element={<Suppliers.Create />} />
        </Route>
        {/** Sales route */}
        <Route path="sales">
          <Route index element={<h2>Sales list</h2>} />
          <Route path="create" element={<h2>Sale create</h2>} />
        </Route>
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
