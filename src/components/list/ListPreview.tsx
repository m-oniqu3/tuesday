import { LockClosedIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../../../utils/formatDate";
import type { List } from "../../types/list";

type Props = {
  list: List;
};

function ListPreview({ list }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 sm:flex sm:flex-col">
      <div className="gray rounded-3xl h-30 w-20 sm:h-40 sm:w-80 "></div>

      <div className=" flex flex-col items-baseline justify-end gap-1 min-w-0 max-w-xs">
        <h3 className="font-medium line-clamp-1 w-full text-sm sm:text-md">
          {list.name}
        </h3>

        <p className="text-neutral-600 leading-5 line-clamp-3 text-sm">
          {list.description}
        </p>

        <div className=" flex items-center gap-4 text-xs  line-clamp-1">
          <p className="line-clamp-1">
            {list.filmsCount} {list.filmsCount === 1 ? "film" : "films"}
          </p>
          <span>&#xb7;</span>

          {list.private && (
            <p className="flex gap-1 ine-clamp-1">
              Private
              <span>
                <LockClosedIcon className="size-4" />
              </span>
            </p>
          )}
          {list.private && <span>&#xb7;</span>}

          <p className="line-clamp-1">{formatDate(list.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default ListPreview;
