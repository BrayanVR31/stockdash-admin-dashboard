import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import { getQueryClient } from "@/QueryClient";
import { refetchingToken } from "@/interceptors/refreshToken";
import App from "./App.tsx";

const queryClient = getQueryClient();
refetchingToken();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
