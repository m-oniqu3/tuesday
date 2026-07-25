import { useModal } from "../hook/useModal";
import { ModalType } from "../types/modal";
import CreateList from "./CreateList";
import ModalOverlay from "./ModalOverlay";

export default function ModalManager() {
  const { modal } = useModal();

  if (!modal.type) return null;

  return (
    <ModalOverlay>
      {modal.type === ModalType.CREATE_LIST && <CreateList />}

      {modal.type === ModalType.DELETE_LIST && <p>temp dlt modal</p>}
    </ModalOverlay>
  );
}
