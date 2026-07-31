import { Link, useParams } from "react-router";
import { createFilmSlug } from "../../../utils/createSlug";
import { useListFilms } from "../../hooks/useListFilms";
import Button from "../Button";
import FilmPreview from "../film/FilmPreview";
import Loading from "../Loading";

function ListFilms() {
  const { listSlug } = useParams() as { listSlug: string };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useListFilms(listSlug);

  const films = data?.pages.flatMap((page) => page.films) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="wrapper relative">
      <ul className="content-grid">
        {films.map((film) => (
          <li key={film.imdbID}>
            <Link to={`/film/${createFilmSlug(film.title, film.imdbID)}`}>
              <FilmPreview
                key={film.imdbID}
                film={{
                  id: film.imdbID,
                  poster: film.poster,
                  title: film.title,
                }}
              />
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

export default ListFilms;
