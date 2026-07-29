import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { useFilmLists } from "../../hooks/useFilmLists";
import { useLists } from "../../hooks/useLists";
import { useModal } from "../../hooks/useModal";
import { saveFilm } from "../../services/save-film";
import type { OmdbFilm } from "../../types/film";
import { ModalType } from "../../types/modal";
import Button from "../Button";
import SaveFilmItem from "./SaveFilmItem";

function SaveFilm() {
  const { user } = useAuth();
  const { closeModal, modal } = useModal();
  const { data: lists, isLoading } = useLists(user?.uid);

  const [isSavingFilm, setIsSavingFilm] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedList, setSelectedList] = useState<string>("");

  const film =
    modal.type === ModalType.SAVE_FILM
      ? (modal.payload as { film: OmdbFilm }).film
      : undefined;

  // get lists the film is saved to
  const { data: filmLists = [] } = useFilmLists(lists ?? [], film?.imdbID);

  console.log({ filmLists });

  function handleSelectedList(listId: string) {
    setSelectedList(listId);
  }

  useEffect(() => {
    async function handleSave() {
      if (!user || !film) return;
      console.log("handle save", user);

      try {
        setIsSavingFilm(true);
        await saveFilm(film, selectedList);

        closeModal();
      } catch (error) {
        console.log(error);

        toast.error("Faled to save film.");
      } finally {
        setIsSavingFilm(false);
      }
    }

    if (selectedList) {
      handleSave();
    }
  }, [selectedList, closeModal, film, user]);

  // search results
  const searchTerm = search.toLowerCase();

  const filteredLists = lists
    ?.filter((list) => list.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (modal.type !== ModalType.SAVE_FILM) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="panel relative p-0 rounded-2xl overflow-hidden h-110 w-76 bg-white"
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

          {film && (
            <p className="truncate text-xs text-center text-neutral-400">
              {film.Title}
            </p>
          )}
        </header>

        <div className="flex flex-col gap-4 h-full overflow-y-scroll no-scrollbar">
          {isLoading && (
            <p className="text-sm text-neutral-400 p-2 text-center">
              Loading...
            </p>
          )}

          {!isLoading && !filteredLists?.length && (
            <p className="text-sm text-neutral-400 p-2 text-center">
              No lists found
            </p>
          )}

          <ul className="flex flex-col gap-4 px-2 h-full overflow-y-scroll no-scrollbar ">
            {filteredLists?.map((list) => {
              const isSaved = filmLists.some(
                (filmList: { collectionId: string }) =>
                  filmList.collectionId === list.id,
              );

              return (
                <SaveFilmItem
                  key={list.id}
                  list={list}
                  isSaved={isSaved}
                  selectList={handleSelectedList}
                  disabled={isSavingFilm}
                />
              );
            })}
          </ul>
        </div>

        <footer className="h-16 w-full p-4 flex items-center justify-end gap-4 border-t border-gray-50 shadow-xs absolute bottom-0 left-0 bg-white z-10">
          <Button onClick={closeModal}>Cancel</Button>
          {search && filteredLists?.length === 0 && (
            <Button
              type="submit"
              className="bg-neutral-800 text-white disabled:opacity-50"
            >
              Create List
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
}

export default SaveFilm;
