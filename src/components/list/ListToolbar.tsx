import {
  EllipsisHorizontalIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import type { List } from "../../types/list";
import type { UserProfile } from "../../types/user";
import Avatar from "../Avatar";
import Tool from "../Tool";

type Props = {
  isListOwner: boolean;
  summary: List;
  profile: UserProfile;
};

function ListToolbar(props: Props) {
  const { isListOwner, summary, profile } = props;

  const toolbar = [
    { name: "Edit", icon: PencilIcon, handler: () => {} },
    {
      name: "Privacy",
      icon: summary.private ? LockOpenIcon : LockClosedIcon,
      handler: () => {},
      disabled: false,
    },
    // { name: "Organize", icon: ArrowPathIcon, handler: () => {} },
    { name: "More", icon: EllipsisHorizontalIcon, handler: () => {} },
  ];

  return (
    <div className="flex items-center gap-4">
      <Avatar name={profile?.displayName ?? profile?.username} />

      {!isListOwner && profile && (
        <figcaption className="text-sml">
          By &nbsp;
          <Link to={`/${profile.username}`} className="font-bold">
            {profile.displayName.split(" ")[0] || profile.username}
          </Link>
        </figcaption>
      )}

      {isListOwner && (
        <>
          {toolbar.map((tool) => (
            <Tool key={tool.name} tool={tool} />
          ))}
        </>
      )}
    </div>
  );
}

export default ListToolbar;
