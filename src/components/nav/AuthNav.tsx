import {
  Bars4Icon,
  BookmarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FilmIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useCurrentUserProfile } from "../../hooks/useCurrentUserProfile";
import { useModal } from "../../hooks/useModal";
import { ModalType } from "../../types/modal";
import Avatar from "../Avatar";
import Button from "../Button";
import Searchbar from "./Searchbar";

const links = ["discover", "collections"];

function AuthNav() {
  const { user } = useAuth();
  const { openModal } = useModal();

  const { data: profile } = useCurrentUserProfile();

  // if (!user || !profile) return null;

  function handleCreateListModal() {
    if (!user) return;
    openModal(ModalType.CREATE_LIST);
  }

  return (
    <header className=" h-16">
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

        <div className="w-full max-w-sm">
          <Searchbar />
        </div>

        <div className=" flex items-center justify-between gap-12 ">
          <Bars4Icon className="size-4.5 lg:hidden" />

          {profile && (
            <div className="hidden lg:flex items-center gap-4">
              <Button
                type="button"
                className="bg-neutral-800 text-white"
                onClick={handleCreateListModal}
              >
                Create
              </Button>
              <BookmarkIcon className="size-4.5" />

              <Avatar name={profile?.displayName ?? profile?.username} />
              <ChevronDownIcon className="size-4.5" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default AuthNav;
