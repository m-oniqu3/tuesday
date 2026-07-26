import { useParams } from "react-router";
import { useList } from "../hooks/useList";
import { useUserByUsername } from "../hooks/useUserByUsername";

function List() {
  const { username, listSlug } = useParams<{
    username: string;
    listSlug: string;
  }>();

  const { data: profile } = useUserByUsername(username);

  const { data: list } = useList(profile?.id, listSlug);

  if (!profile || !list) {
    return <p>Not found</p>;
  }

  // if (isUserLoading || isListLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (!user || !list) {
  //   return <p>List not found</p>;
  // }

  return (
    <main>
      <h1>{list.name}</h1>
      <p>@{profile.username}</p>

      <section>{/* films will go here later */}</section>
    </main>
  );
}

export default List;
