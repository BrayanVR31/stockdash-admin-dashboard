import { Routes, Route } from "react-router";
import { SignIn, Dashboard } from "@pages";

export function Router() {
  return (
    <Routes>
      <Route path="/dashboard">
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
