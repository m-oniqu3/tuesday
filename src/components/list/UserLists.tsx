import { Link } from "react-router";
import type { List } from "../../types/list";

type Props = {
  lists: List[];
  username: string;
};

function UserLists({ lists, username }: Props) {
  return (
    <main>
      <ul>
        {lists.map((list) => {
          return (
            <li key={list.id}>
              <Link to={`/${username}/${list.slug}`}>{list.name}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default UserLists;
