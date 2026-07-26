import { useInfiniteQuery } from "@tanstack/react-query";
import { searchFilms } from "../services/film";

export function useFilmSearch(query: string) {
  return useInfiniteQuery({
    queryKey: ["films", "search", query],

    queryFn: ({ pageParam }) => searchFilms(query, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      const loadedFilms = pages.reduce(
        (total, page) => total + page.films.length,
        0,
      );

      if (loadedFilms >= lastPage.totalResults) {
        return undefined;
      }

      return pages.length + 1;
    },

    enabled: query.length > 2,
  });
}
