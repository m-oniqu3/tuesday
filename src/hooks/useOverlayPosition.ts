import { useEffect, useRef } from "react";
import { useOverlay } from "./useOverlay";

const MENU_WIDTH = 304; // w-76
const MENU_HEIGHT = 440; // h-110
const GAP = 8;
const PADDING = 16;

export function useOverlayPosition() {
  const { overlay, closeOverlay } = useOverlay();

  const overlayRef = useRef<HTMLDivElement>(null);

  function getPosition() {
    if (!overlay.position) return null;

    const { x, y } = overlay.position;

    const spaceBelow = window.innerHeight - y;
    const shouldOpenAbove = spaceBelow < MENU_HEIGHT;

    let top = shouldOpenAbove ? y - MENU_HEIGHT - GAP : y;

    let left = x;

    // Prevent going off the right side
    if (left + MENU_WIDTH > window.innerWidth - PADDING) {
      left = window.innerWidth - MENU_WIDTH - PADDING;
    }

    // Prevent going off the left side
    if (left < PADDING) {
      left = PADDING;
    }

    // Prevent going off the bottom
    if (top + MENU_HEIGHT > window.innerHeight - PADDING) {
      top = window.innerHeight - MENU_HEIGHT - PADDING;
    }

    // Prevent going off the top
    if (top < PADDING) {
      top = PADDING;
    }

    return {
      top,
      left,
    };
  }

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

  // useEffect(() => {
  //   function handleScroll() {
  //     closeOverlay();
  //   }

  //   window.addEventListener("scroll", handleScroll, true);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll, true);
  //   };
  // }, [closeOverlay]);

  return {
    overlayRef,
    styles: {
      position: "fixed" as const,
      zIndex: 999,
      ...getPosition(),
    },
  };
}
