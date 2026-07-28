import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { OmdbFilm } from "../types/film";

export async function saveFilm(film: OmdbFilm, collectionIds: string[]) {
  // save film
  await setDoc(
    doc(db, "films", film.imdbID),
    {
      title: film.Title,
      poster: film.Poster,
      year: film.Year,
      type: film.Type,
    },
    { merge: true },
  );

  // batch save relationships

  const batch = writeBatch(db);

  collectionIds.forEach((collectionId) => {
    const ref = doc(collection(db, "collectionFilms"));

    batch.set(ref, {
      collectionId,
      filmId: film.imdbID,
      createdAt: serverTimestamp(),
    });
  });

  await batch.commit();
}
