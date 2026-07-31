import type { FilmPreviewData, OmdbFilm, SavedFilm } from "../src/types/film";

export function normalizeOmdbFilm(film: OmdbFilm): FilmPreviewData {
  return {
    id: film.imdbID,
    title: film.Title,
    poster: film.Poster,
  };
}

export function normalizeSavedFilm(film: SavedFilm): FilmPreviewData {
  return {
    id: film.imdbID,
    title: film.title,
    poster: film.poster,
  };
}
// export function normalizeTmdbFilm(film: TmdbFilm): FilmPreviewData {
//   return {
//     id: String(film.id),
//     title: film.title ?? film.name,
//     poster: film.poster_path,
//   };
// }
