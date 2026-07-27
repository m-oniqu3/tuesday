import { Link, useSearchParams } from "react-router";
import { createFilmSlug } from "../../utils/createSlug";
import Button from "../components/Button";
import FilmPreview from "../components/film/FilmPreview";
import { useFilmSearch } from "../hooks/useFilmSearch";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFilmSearch(query);

  const films = data?.pages.flatMap((page) => page.films) ?? [];
  return (
    <div className="wrapper">
      <ul className="content-grid">
        {films.map((f) => {
          return (
            <li key={f.imdbID}>
              <Link to={`/film/${createFilmSlug(f.Title, f.imdbID)}`}>
                <FilmPreview film={f} />
              </Link>
            </li>
          );
        })}
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

export default Search;
