import { Routes, Route } from "react-router";
import { SignIn } from "@pages";

export function Router() {
  return (
    <Routes>
      <Route path="/dashboard">
        <Route index element={<h1>Dashboard page</h1>} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
