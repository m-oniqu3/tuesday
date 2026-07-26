import type { OmdbSearchResponse } from "../types/film";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchFilms(
  query: string,
  page = 1,
): Promise<OmdbSearchResponse> {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`,
  );

  const data = await response.json();

  return {
    films: data.Search ?? [],
    totalResults: Number(data.totalResults ?? 0),
  };
}
