import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Searchbar() {
  const [search, setSearch] = useState("");
  return (
    <form className="grid grid-cols-[30px_auto_30px]">
      <div className="gray pl-4 flex-center rounded-l-2xl">
        <MagnifyingGlassIcon className="size-6 text-neutral-400" />
      </div>

      <input
        type="text"
        className="gray w-full text-sm h-12 px-4 font-medium focus:outline-none placeholder:text-neutral-400 placeholder:text-sm"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type="button"
        className="gray pr-4 flex-center rounded-r-2xl cursor-pointer"
      >
        {search && <XMarkIcon className="size-4.5 text-neutral-400" />}
      </button>
    </form>
  );
}

export default Searchbar;
