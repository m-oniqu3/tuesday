import { useParams } from "react-router";
import { useFilm } from "../hooks/useFilm";

function Film() {
  const { filmSlug } = useParams();
  const filmId = filmSlug?.split("-").pop();

  const { data: film, isLoading, error } = useFilm(filmId);
  console.log(film);

  return <main>{filmId}</main>;
}

export default Film;
