import { useParams } from "react-router";
import UserLists from "../components/list/UserLists";
import { useAuth } from "../hooks/useAuth";
import { useUserLists } from "../hooks/useLists";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileSummary from "../user/ProfileSummary";

function Profile() {
  const { username } = useParams();
  const { user } = useAuth();

  const { data: profile, isLoading, error } = useUserProfile(username);
  const { data: lists, isLoading: isListsLoading } = useUserLists(profile?.id);

  if (isLoading || isListsLoading) {
    return <p>Loading...</p>;
  }

  if (error || !profile) {
    return <p>User not found</p>;
  }

  console.log({ profile });

  return (
    <div className="page">
      <ProfileSummary
        summary={profile}
        listsCount={lists?.length ?? 0}
        userId={user?.uid ?? null}
      />

      <UserLists username={profile.username} userId={profile.id} />
    </div>
  );
}

export default Profile;
