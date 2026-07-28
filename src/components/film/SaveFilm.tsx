import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { useFilmLists } from "../../hooks/useFilmLists";
import { useLists } from "../../hooks/useLists";
import { useModal } from "../../hooks/useModal";
import { saveFilm } from "../../services/save-film";
import type { OmdbFilm } from "../../types/film";
import { ModalType } from "../../types/modal";
import Button from "../Button";

function SaveFilm() {
  const { user } = useAuth();
  const { closeModal, modal } = useModal();
  const { data: lists, isLoading } = useLists(user?.uid);

  const [isSavingFilm, setIsSavingFilm] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  // get lists the film is saved to
  const { data: filmLists = [], isLoading: isLoadingFilmLists } = useFilmLists(
    modal.type === ModalType.SAVE_FILM
      ? (modal.payload as { film: OmdbFilm }).film.imdbID
      : undefined,
  );

  if (modal.type !== ModalType.SAVE_FILM) return null;
  const { film } = modal.payload as { film: OmdbFilm };

  // select lists to save to
  function handleToggleList(listId: string) {
    setSelectedLists((current) =>
      current.includes(listId)
        ? current.filter((id) => id !== listId)
        : [...current, listId],
    );
  }

  // search results
  const filteredLists = lists?.filter((list) =>
    list.name.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleSave() {
    if (!user) return;
    console.log("handle save", user);

    try {
      setIsSavingFilm(true);
      await saveFilm(film, selectedLists);

      closeModal();
    } catch (error) {
      console.log(error);

      toast.error("Faled to save film.");
    } finally {
      setIsSavingFilm(false);
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="panel relative p-0 rounded-3xl overflow-hidden h-110 w-76 bg-white"
      // style={{ top: position.y, left: position.x }}
    >
      <div className="grid grid-rows-[auto_auto_1fr_64px] h-full">
        <header className="flex flex-col gap-2 border-b border-gray-50 p-4">
          <p className="text-center text-xs font-medium">Add to Collection</p>

          <div className="flex gap-2">
            <form className="grid flex-1 grid-cols-[30px_auto_30px]">
              <div className="gray flex-center rounded-l-2xl pl-4">
                <MagnifyingGlassIcon className="size-4 text-neutral-400" />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                gray
                h-12
                w-full
                px-4
                text-sm
                font-medium
                placeholder:text-neutral-500
                focus:outline-none
              "
                placeholder="Search..."
              />

              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                gray
                flex-center
                cursor-pointer
                rounded-r-2xl
                pr-4
              "
              >
                {search && <XMarkIcon className="size-4.5 text-neutral-400" />}
              </button>
            </form>

            <button
              className="
              gray
              grid
              size-12
              place-items-center
              rounded-2xl
              text-neutral-500
              transition
              hover:bg-neutral-800
              hover:text-white
            "
            >
              <PlusIcon className="size-4" />
            </button>
          </div>

          <p className="truncate text-xs text-center text-neutral-400">
            {film.Title}
          </p>
        </header>

        <div className="flex flex-col gap-4 h-full overflow-y-scroll no-scrollbar">
          {isLoading ||
            (isLoadingFilmLists && (
              <p className="text-sm text-neutral-400 p-2 text-center">
                Loading...
              </p>
            ))}

          {!isLoading && !filteredLists?.length && (
            <p className="text-sm text-neutral-400 p-2 text-center">
              No filmLists found
            </p>
          )}

          <ul className="flex flex-col gap-4 px-2 h-full overflow-y-scroll no-scrollbar ">
            {filteredLists?.map((list) => {
              const checked = selectedLists.includes(list.id);
              const isSaved = filmLists
                .flatMap((l) => l.collectionId)
                .includes(list.id);

              return (
                <li key={list.id}>
                  <label
                    className="
                    grid
                    cursor-pointer
                    grid-cols-[40px_auto_24px]
                    items-center
                    gap-4
                    rounded-2xl
                    p-3
                    transition
                    hover:bg-neutral-100
                  "
                  >
                    <figure className="relative grid size-10 place-items-center rounded-xl bg-neutral-800">
                      {list.private && (
                        <LockClosedIcon className="size-3.5 text-white" />
                      )}
                    </figure>

                    <div>
                      <p className="line-clamp-1 text-sm font-medium text-neutral-800">
                        {list.name}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {isSaved ? (
                          "Saved here"
                        ) : (
                          <>
                            {list.filmsCount}{" "}
                            {list.filmsCount === 1 ? "film" : "films"}
                          </>
                        )}
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleList(list.id)}
                      className="size-3 accent-neutral-800 rounded"
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="h-16 w-full p-4 flex items-center justify-end gap-4 border-t border-gray-50 shadow-xs absolute bottom-0 left-0 bg-white z-10">
          <Button onClick={closeModal}>Cancel</Button>

          <Button
            type="submit"
            disabled={isSavingFilm}
            className="bg-neutral-800 text-white disabled:opacity-50"
            onClick={handleSave}
          >
            {isSavingFilm ? "Saving..." : "Save"}
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default SaveFilm;
