import { LockClosedIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../../../utils/formatDate";
import type { List } from "../../types/list";
import type { UserProfile } from "../../types/user";
import ListToolbar from "./ListToolbar";

type Props = {
  summary: List;
  profile: UserProfile;
};

function ListSummary({ summary, profile }: Props) {
  return (
    <section className="wrapper flex flex-col gap-4 ">
      <article className="max-w-112.5 flex flex-col gap-1 ">
        <h3 className="text-[14px] sm:text-md font-medium max-w-lg text-neutral-800">
          {summary.name}
        </h3>

        {summary.description && (
          <p className="text-neutral-600 text-sm leading-5">
            {summary.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs  text-neutral-800">
          {summary.private && (
            <p className="flex gap-1">
              Private
              <span>
                <LockClosedIcon className="size-4" />
              </span>
            </p>
          )}

          {summary.private && <span>&#xb7;</span>}

          <p>
            {summary.filmsCount} {summary.filmsCount === 1 ? "film" : "films"}
          </p>

          <span>&#xb7;</span>
          <p>{formatDate(summary.createdAt)}</p>
        </div>
      </article>

      <div>
        <ListToolbar
          isListOwner={profile.id === summary.userId}
          summary={summary}
          profile={profile}
        />
      </div>
    </section>
  );
}

export default ListSummary;
