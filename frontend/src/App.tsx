import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/theme";
import { LoginPage } from "@/features/authentication";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard">
            <Route index element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
