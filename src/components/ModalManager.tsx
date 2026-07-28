import { useModal } from "../hooks/useModal";
import { ModalType } from "../types/modal";
import CreateList from "./list/CreateList";
import ModalOverlay from "./ModalOverlay";

import SaveFilm from "./film/SaveFilm";

export default function ModalManager() {
  const { modal } = useModal();

  if (!modal.type) return null;

  return (
    <ModalOverlay>
      {modal.type === ModalType.CREATE_LIST && <CreateList />}
      {modal.type === ModalType.SAVE_FILM && <SaveFilm />}
      {modal.type === ModalType.DELETE_LIST && <p>temp dlt modal</p>}
    </ModalOverlay>
  );
}
