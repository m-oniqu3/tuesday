import { useOverlay } from "../../hooks/useOverlay";
import Portal from "../portal/Portal";
import SaveFilmMenu from "./SaveFilmMenu";

function OverlayManager() {
  const { overlay } = useOverlay();

  if (!overlay.type) {
    return null;
  }

  console.log(overlay);

  switch (overlay.type) {
    case "SAVE_FILM":
      return (
        <Portal>
          <SaveFilmMenu />
        </Portal>
      );

    default:
      return null;
  }
}

export default OverlayManager;
