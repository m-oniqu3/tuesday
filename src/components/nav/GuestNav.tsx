import { Bars4Icon, FilmIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

import { links } from "../../../utils/nav-list";
import AuthButtons from "./AuthButtons";

function GuestNav() {
  return (
    <header className="h-16">
      <nav className="wrapper h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FilmIcon className="size-4.5 text-neutral-800" />

          <ul className="hidden lg:flex gap-4 items-center">
            {links.map((link) => {
              return (
                <Link
                  key={link}
                  to={"/" + link}
                  className="text-neutral-600 text-xs font-medium capitalize hidden md:grid"
                >
                  {link}
                </Link>
              );
            })}
          </ul>
        </div>

        <div className=" flex items-center justify-between gap-12 ">
          <Bars4Icon className="size-4.5 lg:hidden" />

          <div className="hidden lg:flex items-center gap-4">
            <AuthButtons />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default GuestNav;
