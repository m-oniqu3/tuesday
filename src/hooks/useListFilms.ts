import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { SavedFilm } from "../types/film";

type Cursor = QueryDocumentSnapshot | undefined;

type ListFilmsPage = {
  films: SavedFilm[];
  nextCursor?: Cursor;
};

const PAGE_SIZE = 20;

export function useListFilms(listSlug?: string) {
  return useInfiniteQuery<ListFilmsPage>({
    queryKey: ["list-films", listSlug],

    enabled: !!listSlug,

    initialPageParam: undefined as Cursor,

    queryFn: async ({ pageParam }) => {
      if (!listSlug) {
        return {
          films: [],
          nextCursor: undefined,
        };
      }

      // 1. Find list by slug
      const listSnapshot = await getDocs(
        query(collection(db, "lists"), where("slug", "==", listSlug), limit(1)),
      );

      const listDoc = listSnapshot.docs[0];

      if (!listDoc) {
        return {
          films: [],
          nextCursor: undefined,
        };
      }

      const listId = listDoc.id;

      // 2. Get films saved to list
      const constraints: QueryConstraint[] = [
        where("collectionId", "==", listId),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE),
      ];

      if (pageParam) {
        constraints.push(startAfter(pageParam));
      }

      const savedSnapshot = await getDocs(
        query(collection(db, "collectionFilms"), ...constraints),
      );

      const nextCursor =
        savedSnapshot.docs.length === PAGE_SIZE
          ? savedSnapshot.docs[savedSnapshot.docs.length - 1]
          : undefined;

      const filmIds = savedSnapshot.docs.map(
        (doc) => doc.data().filmId as string,
      );

      if (!filmIds.length) {
        return {
          films: [],
          nextCursor,
        };
      }

      // 3. Fetch films
      const films = await Promise.all(
        filmIds.map(async (filmId) => {
          const snapshot = await getDoc(doc(db, "films", filmId));

          if (!snapshot.exists()) return null;

          return {
            imdbID: snapshot.id,
            ...snapshot.data(),
          } as SavedFilm;
        }),
      );

      return {
        films: films.filter((film): film is SavedFilm => film !== null),
        nextCursor,
      };
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
