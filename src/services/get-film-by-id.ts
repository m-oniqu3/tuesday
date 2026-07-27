import type { OmdbFilmDetails } from "../types/film";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function getFilmById(filmId: string): Promise<OmdbFilmDetails> {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${filmId}`,
  );

  return response.json();
}
