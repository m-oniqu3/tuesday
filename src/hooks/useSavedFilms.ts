/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { OmdbFilm } from "../types/film";
import { useAuth } from "./useAuth";

type Cursor = QueryDocumentSnapshot | undefined;

type SavedFilmsPage = {
  films: OmdbFilm[];
  nextCursor?: Cursor;
};

const PAGE_SIZE = 20;

export function useSavedFilms() {
  const { user } = useAuth();

  return useInfiniteQuery<SavedFilmsPage>({
    queryKey: ["saved-films", user?.uid],

    enabled: !!user,

    initialPageParam: undefined as Cursor,

    queryFn: async ({ pageParam }) => {
      if (!user) {
        return {
          films: [],
          nextCursor: undefined,
        };
      }

      // 1. Get user's lists
      const listsSnapshot = await getDocs(
        query(collection(db, "lists"), where("userId", "==", user.uid)),
      );

      const listIds = listsSnapshot.docs.map((doc) => doc.id);

      if (!listIds.length) {
        return {
          films: [],
          nextCursor: undefined,
        };
      }

      // 2. Get saved film relationships
      const saveSnapshots = await Promise.all(
        listIds.map((listId) =>
          getDocs(
            query(
              collection(db, "collectionFilms"),
              where("collectionId", "==", listId),
              orderBy("createdAt", "desc"),
              limit(PAGE_SIZE),
            ),
          ),
        ),
      );

      const savedDocs = saveSnapshots.flatMap((snapshot) => snapshot.docs);

      const savedFilms = savedDocs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (!savedFilms.length) {
        return {
          films: [],
          nextCursor: undefined,
        };
      }

      // newest saves first
      savedFilms.sort(
        (a: any, b: any) => b.createdAt.toMillis() - a.createdAt.toMillis(),
      );

      // remove duplicate films
      const filmIds = [...new Set(savedFilms.map((film: any) => film.filmId))];

      // 3. Fetch film documents
      const filmResults = await Promise.all(
        filmIds.map(async (filmId) => {
          const snapshot = await getDoc(doc(db, "films", filmId));

          if (!snapshot.exists()) return null;

          return {
            imdbID: snapshot.id,
            ...snapshot.data(),
          } as OmdbFilm;
        }),
      );

      console.log("user", user.uid);

      console.log(
        "lists",
        listsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );

      console.log("listIds", listIds);

      console.log(
        "savedDocs",
        savedDocs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );

      console.log("filmIds", filmIds);

      console.log("filmResults", filmResults);

      return {
        films: filmResults.filter((film): film is OmdbFilm => film !== null),
        nextCursor: undefined,
      };
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
