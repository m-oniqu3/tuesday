import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes.tsx";
import ModalManager from "./components/ModalManager.tsx";
import { AuthProvider } from "./context/AuthContextProvider.tsx";
import { ModalProvider } from "./context/ModalContextProvider.tsx";
import "./index.css";
import { queryClient } from "./lib/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <ModalManager />
            <Toaster position="bottom-center" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>,
);
