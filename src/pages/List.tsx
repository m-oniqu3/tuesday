import { useParams } from "react-router";
import ListSummary from "../components/list/ListSummary";
import { useAuth } from "../hooks/useAuth";
import { useList } from "../hooks/useList";
import { useUserByUsername } from "../hooks/useUserByUsername";

function List() {
  const { user } = useAuth();

  const { username, listSlug } = useParams<{
    username: string;
    listSlug: string;
  }>();

  const { data: profile, isLoading: isUserLoading } =
    useUserByUsername(username);

  const { data: list, isLoading: isListLoading } = useList(
    profile?.id,
    listSlug,
    user?.uid,
  );

  if (isUserLoading || isListLoading) {
    return <p>Loading...</p>;
  }

  console.log(profile);

  if (!profile || !list) {
    return <p>List not found</p>;
  }

  const canViewList = !list.private || list.userId === user?.uid;

  if (!canViewList) {
    return <p>This list is private.</p>;
  }

  return (
    <main>
      <ListSummary summary={list} profile={profile} />

      <section>{/* films */}</section>
    </main>
  );
}

export default List;
