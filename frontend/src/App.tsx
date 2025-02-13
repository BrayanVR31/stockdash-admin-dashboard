import { createPortal } from "react-dom";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme";
import { router } from "@/routes";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      {createPortal(<ToastContainer />, document.querySelector("body")!)}
    </ThemeProvider>
  );
}

export default App;
