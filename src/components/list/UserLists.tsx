import { Link } from "react-router";
import { useUserLists } from "../../hooks/useLists";

type Props = {
  username: string;
  userId: string;
};

function UserLists(props: Props) {
  const { username, userId } = props;

  const { data: lists, isLoading } = useUserLists(userId);

  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (!lists) {
    return <p>No data</p>;
  }

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
