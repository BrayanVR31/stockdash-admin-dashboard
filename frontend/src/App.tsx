import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme";
import { AppRouter } from "@/routes";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
      {createPortal(<ToastContainer />, document.querySelector("body")!)}

    </ThemeProvider>
  );
}

export default App;
