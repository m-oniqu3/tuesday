import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FilmIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router";

function Searchbar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    // console.log({ query });
    navigate({
      pathname: "/search",
      search: `?q=${query.trim()}`,
    });
  }

  return (
    <form className="grid grid-cols-[45px_auto_45px]" onSubmit={handleSubmit}>
      <div className="gray flex-center rounded-l-2xl">
        <FilmIcon className="size-4.5 text-neutral-800" />
      </div>

      <input
        type="text"
        className="gray w-full text-sm h-12 leading-5 focus:outline-none placeholder:text-neutral-400 placeholder:text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search films..."
      />

      <button
        type="submit"
        className="gray pr-4 flex-center rounded-r-2xl cursor-pointer"
      >
        {!query ? (
          <MagnifyingGlassIcon className="size-4 text-neutral-800" />
        ) : (
          <XMarkIcon
            className="size-4.5 text-neutral-800"
            onClick={() => setQuery("")}
          />
        )}
      </button>
    </form>
  );
}

export default Searchbar;
