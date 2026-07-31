import { Link } from "react-router";
import { createFilmSlug } from "../../utils/createSlug";
import Button from "../components/Button";
import FilmPreview from "../components/film/FilmPreview";
import Loading from "../components/Loading";
import { useSavedFilms } from "../hooks/useSavedFilms";

function SavedFilms() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSavedFilms();

  const films = data?.pages.flatMap((page) => page.films) ?? [];

  if (isLoading) {
    return <Loading />;
  }
  console.log(films);

  return (
    <div className="wrapper relative">
      <ul className="content-grid">
        {films.map((film) => (
          <li key={film.imdbID}>
            <Link to={`/film/${createFilmSlug(film.Title, film.imdbID)}`}>
              <FilmPreview key={film.imdbID} film={film} />
            </Link>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mx-auto my-4 hover:gray"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
}

export default SavedFilms;
