import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { SavedFilm } from "../types/film";
import { useAuth } from "./useAuth";

export function useRecentSavedLists() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["recent-saved-lists", user?.uid],
    queryFn: async () => {
      if (!user) return [];

      // 1. Get user's lists
      const listsQuery = query(
        collection(db, "collections"),
        where("userId", "==", user.uid),
      );

      const listsSnapshot = await getDocs(listsQuery);

      const lists = listsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 2. Get recent saves from those lists
      const collectionIds = lists.map((list) => list.id);

      const filmsQuery = query(
        collection(db, "collectionFilms"),
        where("collectionId", "in", collectionIds),
        orderBy("createdAt", "desc"),
        limit(10),
      );

      const filmsSnapshot = await getDocs(filmsQuery);

      const savedFilms = filmsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SavedFilm[];

      // 3. Get unique recent lists
      return savedFilms
        .map((film) => lists.find((list) => list.id === film.collectionId))
        .filter(Boolean)
        .slice(0, 3);
    },
    enabled: !!user,
  });
}
