import { BrowserRouter, Routes, Route } from "react-router";
import { AuthRoute } from "./auth-route";
import { ProtectedRouter } from "./protected-router";
import { Profile } from "@/features";
import { SidebarProvider } from "@/components/ui/sidebar";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthRoute />} />
        <Route path="/dashboard" element={<ProtectedRouter />}>
          <Route index element={<div>Dashboard</div>} />
          <Route path="account/profile" element={<Profile.Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
