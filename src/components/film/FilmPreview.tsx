import { PlusIcon } from "@heroicons/react/24/outline";
import type { OmdbFilm } from "../../types/film";

type Props = {
  film: OmdbFilm;
  openMenu: (
    film: OmdbFilm,
    position: {
      x: number;
      y: number;
    },
  ) => void;
  activeFilm: OmdbFilm | null;
};
function FilmPreview({ film, openMenu }: Props) {
  function handleSaveClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    openMenu(film, {
      x: rect.left,
      y: rect.bottom + 8,
    });
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
          onClick={handleSaveClick}
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
