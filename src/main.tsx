import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes.tsx";
import ModalManager from "./components/ModalManager.tsx";
import OverlayManager from "./components/overlay/OverlayManager.tsx";
import { AuthProvider } from "./context/AuthContextProvider.tsx";
import { ModalProvider } from "./context/ModalContextProvider.tsx";
import { OverlayProvider } from "./context/OverlayProvider.tsx";
import "./index.css";
import { queryClient } from "./lib/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <OverlayProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <AppRoutes />
              <OverlayManager />
              <ModalManager />
              <Toaster position="bottom-center" />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </BrowserRouter>
        </OverlayProvider>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>,
);
