import { createPortal } from "react-dom";
import { ThemeProvider } from "@/components/theme";
import { AppRouter } from "@/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
      {createPortal(<ToastContainer />, document.querySelector("body")!)}
    </ThemeProvider>
  );
}

export default App;
