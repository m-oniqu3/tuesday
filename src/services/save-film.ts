import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { OmdbFilm } from "../types/film";

export async function saveFilm(film: OmdbFilm, collectionId: string) {
  const batch = writeBatch(db);

  batch.set(
    doc(db, "films", film.imdbID),
    {
      title: film.Title,
      poster: film.Poster,
      year: film.Year,
      type: film.Type,
    },
    { merge: true },
  );

  batch.set(doc(collection(db, "collectionFilms")), {
    collectionId,
    filmId: film.imdbID,
    createdAt: serverTimestamp(),
  });

  await batch.commit();
}
