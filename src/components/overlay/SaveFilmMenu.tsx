import { useOverlay } from "../../hooks/useOverlay";
import { useOverlayPosition } from "../../hooks/useOverlayPosition";
import type { OmdbFilm } from "../../types/film";

function SaveFilmMenu() {
  const { overlay } = useOverlay();
  const { overlayRef, styles } = useOverlayPosition();

  const film = overlay.data as OmdbFilm;

  if (!film) return null;

  return (
    <div
      ref={overlayRef}
      style={styles}
      className="rounded-xl bg-white p-4 shadow-lg"
    >
      Save {film.Title}
    </div>
  );
}

export default SaveFilmMenu;
