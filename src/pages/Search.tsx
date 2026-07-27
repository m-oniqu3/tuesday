import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { createFilmSlug } from "../../utils/createSlug";
import Button from "../components/Button";
import FilmPreview from "../components/film/FilmPreview";
import SaveFilmMenu from "../components/overlay/SaveFilmMenu";
import Portal from "../components/portal/Portal";
import { useFilmSearch } from "../hooks/useFilmSearch";
import type { OmdbFilm } from "../types/film";
import type { Position } from "../types/overlay";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFilmSearch(query);

  const films = data?.pages.flatMap((page) => page.films) ?? [];

  const [menu, setMenu] = useState<{
    film: OmdbFilm | null;
    position: Position | null;
  }>({
    film: null,
    position: null,
  });

  function openMenu(film: OmdbFilm, position: Position) {
    setMenu({
      film,
      position,
    });
  }

  function closeMenu() {
    setMenu({
      film: null,
      position: null,
    });
  }

  return (
    <div className="wrapper relative">
      <ul className="content-grid">
        {films.map((film) => (
          <li key={film.imdbID}>
            <Link to={`/film/${createFilmSlug(film.Title, film.imdbID)}`}>
              <FilmPreview
                film={film}
                openMenu={openMenu}
                activeFilm={menu.film}
              />
            </Link>
          </li>
        ))}
      </ul>

      {menu.film && menu.position && (
        <Portal>
          <SaveFilmMenu
            film={menu.film}
            position={menu.position}
            onClose={closeMenu}
          />
        </Portal>
      )}

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
