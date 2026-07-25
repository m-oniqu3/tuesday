import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes.tsx";
import ModalManager from "./components/ModalManager.tsx";
import { AuthProvider } from "./context/AuthContextProvider.tsx";
import { ModalProvider } from "./context/ModalContextProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <AppRoutes />
          <ModalManager />
          <Toaster position="bottom-center" />
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>,
);
