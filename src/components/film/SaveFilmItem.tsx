import LockClosedIcon from "@heroicons/react/24/outline/LockClosedIcon";
import type { List } from "../../types/list";
import Button from "../Button";

type Props = {
  list: List;
  isSaved: boolean;
  selectList: (id: string) => void;
  disabled: boolean;
};

function SaveFilmItem(props: Props) {
  const { list, isSaved, selectList, disabled } = props;

  return (
    <li key={list.id}>
      <label className="grid cursor-pointer grid-cols-[40px_auto_60px] items-center gap-4 rounded-2xl p-3 transitiion hover:bg-neutral-100">
        <figure className="relative grid size-10 place-items-center rounded-xl gray">
          {list.private && <LockClosedIcon className="size-3.5 text-white" />}
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
                {list.filmsCount} {list.filmsCount === 1 ? "film" : "films"}
              </>
            )}
          </p>
        </div>

        <Button
          className={`bg-tertiary transition text-white hidden hover:block`}
          disabled={disabled}
          onClick={() => selectList(list.id)}
        >
          Save
        </Button>
      </label>
    </li>
  );
}

export default SaveFilmItem;
