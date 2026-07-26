import { useParams } from "react-router";
import UserLists from "../components/list/UserLists";
import { useAuth } from "../hooks/useAuth";

import Button from "../components/Button";
import { useUserLists } from "../hooks/useUserLists";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileSummary from "../user/ProfileSummary";

function Profile() {
  const { username } = useParams();
  const { user } = useAuth();

  const { data: profile, isLoading, error } = useUserProfile(username);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useUserLists(
    profile?.id,
    user?.uid,
  );

  const lists = data?.pages.flatMap((page) => page?.lists) ?? [];

  // const isOwner = user?.uid === profile?.id;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !profile) {
    return <p>User not found</p>;
  }

  return (
    <div className="page">
      <ProfileSummary
        summary={profile}
        listsCount={lists?.length ?? 0}
        userId={user?.uid ?? null}
      />

      <UserLists lists={lists ?? []} username={profile.username} />

      {hasNextPage && (
        <Button
          className="my-4 hover:gray"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
}

export default Profile;
