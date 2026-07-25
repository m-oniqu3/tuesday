import { useReducer } from "react";
import type { ModalState, ModalType } from "../types/modal";
import { ModalContext } from "./ModalContext";

type ModalAction =
  | {
      type: "OPEN_MODAL";
      payload: {
        type: ModalType;
        data?: unknown;
      };
    }
  | {
      type: "CLOSE_MODAL";
    };

const initialState: ModalState = {
  type: null,
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        type: action.payload.type,
        payload: action.payload.data,
      };

    case "CLOSE_MODAL":
      return initialState;

    default:
      return state;
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, dispatch] = useReducer(modalReducer, initialState);

  function openModal(type: ModalType, data?: unknown) {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        type,
        data,
      },
    });
  }

  function closeModal() {
    dispatch({
      type: "CLOSE_MODAL",
    });
  }

  function stopPropagation(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        stopPropagation,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
