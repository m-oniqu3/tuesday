import { useEffect, useRef } from "react";
import { useOverlay } from "./useOverlay";

export function useOverlayPosition() {
  const { overlay, closeOverlay } = useOverlay();

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        closeOverlay();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOverlay]);

  const styles = {
    position: "fixed",
    top: overlay.position?.y,
    left: overlay.position?.x,
    zIndex: 999,
  } as const;

  return {
    overlayRef,
    styles,
    closeOverlay,
  };
}
