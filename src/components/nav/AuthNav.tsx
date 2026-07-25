import {
  Bars4Icon,
  BookmarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FilmIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../hook/useAuth";
import Button from "../Button";
import Searchbar from "./Searchbar";

function AuthNav() {
  const { user } = useAuth();

  return (
    <header className=" h-16">
      <nav className="wrapper  h-full flex items-center justify-between ">
        <FilmIcon className="size-6 text-red-800" />

        <Searchbar />

        <Bars4Icon className="size-5 lg:hidden" />
        <div className="hidden lg:flex items-center gap-4">
          <Button type="button" className="bg-[#991b1b] text-white">
            Create
          </Button>
          <BookmarkIcon className="size-4" />

          <div className="size-6 text-xs rounded-full bg-[#d1e7e0] text-[#e09a8e] flex-center">
            {user?.displayName?.[0] ?? ""}
          </div>

          <ChevronDownIcon className="size-4" />
        </div>
      </nav>
    </header>
  );
}

export default AuthNav;
