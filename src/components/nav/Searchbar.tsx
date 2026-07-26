import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FilmIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function Searchbar() {
  const [search, setSearch] = useState("");
  return (
    <form className="grid grid-cols-[45px_auto_45px]">
      <div className="gray flex-center rounded-l-2xl">
        <FilmIcon className="size-4.5 text-neutral-400" />
      </div>

      <input
        type="text"
        className="gray w-full text-sm h-12 leading-5 focus:outline-none placeholder:text-neutral-400 placeholder:text-sm"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type="button"
        onClick={() => setSearch("")}
        className="gray pr-4 flex-center rounded-r-2xl cursor-pointer"
      >
        {!search ? (
          <MagnifyingGlassIcon className="size-4 text-neutral-400" />
        ) : (
          <XMarkIcon className="size-4.5 text-neutral-400" />
        )}
      </button>
    </form>
  );
}

export default Searchbar;
