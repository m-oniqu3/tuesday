import { useContext } from "react";
import { OverlayContext } from "../context/OverlayContext";

export function useOverlay() {
  const context = useContext(OverlayContext);

  if (!context) {
    throw new Error("useOverlay must be used inside OverlayProvider");
  }

  return context;
}
