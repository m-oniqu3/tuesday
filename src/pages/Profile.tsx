import { useParams } from "react-router";
import UserLists from "../components/list/UserLists";
import { useAuth } from "../hooks/useAuth";

import { useUserLists } from "../hooks/useUserLists";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileSummary from "../user/ProfileSummary";

function Profile() {
  const { username } = useParams();
  const { user } = useAuth();

  const { data: profile, isLoading, error } = useUserProfile(username);

  const { data: lists, isLoading: isProfileLoading } = useUserLists(
    profile?.id,
    user?.uid,
  );

  // const isOwner = user?.uid === profile?.id;

  if (isLoading || isProfileLoading) {
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
    </div>
  );
}

export default Profile;
