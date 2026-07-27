import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

function Portal({ children }: Props) {
  const element = document.getElementById("overlay-root");

  if (!element) return null;

  return createPortal(children, element);
}

export default Portal;
