import { useOverlay } from "../../hooks/useOverlay";
import { useOverlayPosition } from "../../hooks/useOverlayPosition";
import type { OmdbFilm } from "../../types/film";

function SaveFilmMenu() {
  const { overlay } = useOverlay();
  const { overlayRef, styles } = useOverlayPosition();

  const film = overlay.data as OmdbFilm;

  return (
    <div
      ref={overlayRef}
      style={styles}
      className="relative p-0 rounded-3xl overflow-hidden h-110 w-76 bg-white"
    >
      Save {film.Title}
    </div>
  );
}

export default SaveFilmMenu;
