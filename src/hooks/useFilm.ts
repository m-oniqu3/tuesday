import { useQuery } from "@tanstack/react-query";
import { getFilmById } from "../services/get-film-by-id";

import type { OmdbFilmDetails } from "../types/film";

export function useFilm(filmId?: string) {
  return useQuery<OmdbFilmDetails>({
    queryKey: ["film", filmId],

    queryFn: () => getFilmById(filmId!),

    enabled: !!filmId,
  });
}
