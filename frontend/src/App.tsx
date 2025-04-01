import { BrowserRouter } from "react-router";
import Router from "@/routes/Router";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
