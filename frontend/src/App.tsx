import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/theme";
import { LoginPage } from "@/features/authentication";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
