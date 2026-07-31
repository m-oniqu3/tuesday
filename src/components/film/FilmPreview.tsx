import { PlusIcon } from "@heroicons/react/24/outline";
import type { MouseEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import type { FilmPreviewData, OmdbFilm } from "../../types/film";
import { ModalType } from "../../types/modal";

type Props = {
  film: FilmPreviewData;
};

function FilmPreview({ film }: Props) {
  const { user } = useAuth();
  const { openModal, modal } = useModal();

  const filmId =
    modal.type === ModalType.SAVE_FILM
      ? (modal.payload as { film: OmdbFilm }).film.imdbID
      : undefined;

  const isActiveFilm = filmId === film.id;
  function handleSaveFilmModal(e: MouseEvent) {
    e.preventDefault();

    if (!user) return;
    openModal(ModalType.SAVE_FILM, { film });
  }
  return (
    <figure className="group relative size-full overflow-hidden ">
      <img src={film.poster} alt={film.title} className="w-full aspect-2/3 " />

      <div
        className={`
          absolute inset-0
          flex items-center justify-center
          bg-black/40
          opacity-0
          transition
          group-hover:opacity-100
${isActiveFilm ? "opacity-100" : ""}
        `}
      >
        <button
          onClick={handleSaveFilmModal}
          className="
            flex
            size-10
            items-center
            justify-center
            rounded-full
            bg-white
            text-black
            shadow
          "
        >
          <PlusIcon className="size-4.5" />
        </button>
      </div>
    </figure>
  );
}

export default FilmPreview;
