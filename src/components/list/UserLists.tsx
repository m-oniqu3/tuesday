import { Link } from "react-router";
import type { List } from "../../types/list";
import ListPreview from "./ListPreview";

type Props = {
  lists: List[];
  username: string;
};

function UserLists({ lists, username }: Props) {
  return (
    <main className="wrapper">
      <ul className="content-grid">
        {lists.map((list) => {
          return (
            <li key={list.id}>
              <Link to={`/${username}/${list.slug}`}>
                <ListPreview key={list.id} list={list} />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default UserLists;
