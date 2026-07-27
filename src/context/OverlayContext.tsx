import { createContext } from "react";

type Position = {
  x: number;
  y: number;
};

export type OverlayState<T = unknown> = {
  type: string | null;
  data: T | null;
  position: Position | null;
};

type OverlayContextType = {
  overlay: OverlayState;
  openOverlay: <T>(type: string, data: T, position: Position) => void;
  closeOverlay: () => void;
};

export const OverlayContext = createContext<OverlayContextType | null>(null);
