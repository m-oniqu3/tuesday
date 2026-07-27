import { type ReactNode, useState } from "react";
import type { Position } from "../types/overlay";
import { type OverlayState, OverlayContext } from "./OverlayContext";

type Props = {
  children: ReactNode;
};

export function OverlayProvider({ children }: Props) {
  const [overlay, setOverlay] = useState<OverlayState>({
    type: null,
    data: null,
    position: null,
  });

  function openOverlay<T>(type: string, data: T, position: Position) {
    console.log("clicked");

    setOverlay({
      type,
      data,
      position,
    });
  }

  function closeOverlay() {
    setOverlay({
      type: null,
      data: null,
      position: null,
    });
  }

  return (
    <OverlayContext.Provider
      value={{
        overlay,
        openOverlay,
        closeOverlay,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}
