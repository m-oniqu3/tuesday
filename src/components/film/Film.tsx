import type { OmdbFilm } from "../../types/film";

type Props = {
  film: OmdbFilm;
};

function Film({ film }: Props) {
  return (
    <figure className="group relative size-full">
      <img src={film.Poster} alt={film.Title} className="size-full" />
    </figure>
  );
}

export default Film;
