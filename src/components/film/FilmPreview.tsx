import { PlusIcon } from "@heroicons/react/24/outline";
import type { MouseEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import type { OmdbFilm } from "../../types/film";
import { ModalType } from "../../types/modal";

type Props = {
  film: OmdbFilm;
};

function FilmPreview({ film }: Props) {
  const { user } = useAuth();
  const { openModal } = useModal();

  function handleSaveFilmModal(e: MouseEvent) {
    e.preventDefault();

    if (!user) return;
    openModal(ModalType.SAVE_FILM, { film });
  }
  return (
    <figure className="group relative size-full overflow-hidden ">
      <img src={film.Poster} alt={film.Title} className="w-full aspect-2/3 " />

      <div
        className="
          absolute inset-0
          flex items-center justify-center
          bg-black/40
          opacity-0
          transition
          group-hover:opacity-100
        "
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
