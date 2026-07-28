import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { SavedFilm } from "../types/film";
import { useAuth } from "./useAuth";

// get the lists the film is saved to only when user & filmId is present
export function useFilmLists(filmId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["film-collections", user?.uid, filmId],
    queryFn: async () => {
      if (!user || !filmId) return [];

      const q = query(
        collection(db, "collectionFilms"),
        // where("userId", "==", user.uid),
        where("filmId", "==", filmId),
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SavedFilm[];
    },
    enabled: !!user && !!filmId,
  });
}
