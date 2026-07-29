import Avatar from "../components/Avatar";
import type { UserProfile } from "../types/user";
import ProfileToolbar from "./ProfileToolbar";

type Props = {
  summary: UserProfile;
  listsCount: number;
  userId: string | null;
};

function ProfileSummary({ summary, listsCount, userId }: Props) {
  const isOwnAccount = summary.id === userId;

  return (
    <section className="wrapper flex flex-col gap-4 sm:flex-row sm:gap-8">
      <Avatar
        name={summary.displayName ?? summary.username}
        className="size-16 sm:siz-20 md:size-24 lg:size-28"
      />

      <div className="flex flex-col gap-2">
        <article className="flex flex-col gap-1">
          <div>
            <h2 className="font-medium text-[14px] sm:text-md m-0 ">
              <span>
                {summary.displayName ? summary.displayName : summary.username}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-sm text-neutral-600">@{summary.username}</p>

              <span>&bull;</span>

              <p className="text-sm text-neutral-600">
                {listsCount} {listsCount === 1 ? "list" : "lists"}
              </p>
            </div>
          </div>

          <p className="text-neutral-600 leading-5 text-sm">{summary.bio}</p>
        </article>

        {isOwnAccount && <ProfileToolbar summary={summary} />}
      </div>
    </section>
  );
}

export default ProfileSummary;
