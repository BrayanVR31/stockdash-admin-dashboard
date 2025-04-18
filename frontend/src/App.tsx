import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import Router from "@/routes/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
};

export default App;
