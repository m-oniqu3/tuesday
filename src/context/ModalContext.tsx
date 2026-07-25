import { createContext } from "react";
import type { ModalState, ModalType } from "../types/modal";

type ModalContextType = {
  modal: ModalState;
  openModal: (type: ModalType, data?: unknown) => void;
  closeModal: () => void;
  stopPropagation(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
