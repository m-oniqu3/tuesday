import type { Timestamp } from "firebase/firestore";

export type OmdbFilm = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
};

export type OmdbSearchResponse = {
  films: OmdbFilm[];
  totalResults: number;
};

export type OmdbFilmDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbID: string;
};

export type SavedFilm = {
  imdbID: string;
  title: string;
  poster: string;
  year: string;
  type: string;
};

export type SavedFilmState = {
  isSaved: boolean;
  collections: SavedFilm[];
};

export type CollectionFilm = {
  id: string;
  collectionId: string;
  filmId: string;
  createdAt: Timestamp;
};

export type FilmPreviewData = {
  id: string;
  title: string;
  poster: string;
};
