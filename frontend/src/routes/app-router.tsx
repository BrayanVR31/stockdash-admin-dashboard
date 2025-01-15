import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "@/features/authentication";
import { ProtectedRouter } from "./protected-router";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRouter />}>
          <Route index element={<div>Dashboard</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
