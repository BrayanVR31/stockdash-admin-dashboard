import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "@/features/authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
