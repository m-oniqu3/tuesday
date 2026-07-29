import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { CollectionFilm } from "../types/film";
import type { List } from "../types/list";
import { useAuth } from "./useAuth";

export function useFilmLists(
  lists: List[] = [],
  filmId?: string,
): UseQueryResult<CollectionFilm[], Error> {
  const { user } = useAuth();

  return useQuery<CollectionFilm[]>({
    queryKey: ["film-lists", user?.uid, filmId],
    queryFn: async () => {
      if (!user || !filmId) return [];

      const filmSaves = await getDocs(
        query(collection(db, "collectionFilms"), where("filmId", "==", filmId)),
      );

      const userCollectionIds = new Set(lists.map((list) => list.id));

      return filmSaves.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as CollectionFilm,
        )
        .filter((save) => userCollectionIds.has(save.collectionId));
    },
    enabled: !!user && !!filmId && lists.length > 0,
  });
}
