import { useParams } from "react-router";
import UserLists from "../components/list/UserLists";
import { useUserProfile } from "../hooks/useUserProfile";

function Profile() {
  const { username } = useParams();

  const { data: profile, isLoading, error } = useUserProfile(username);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !profile) {
    return <p>User not found</p>;
  }

  console.log({ profile });

  return (
    <div>
      <p>hey from profille</p>
      <h1>{profile.username}</h1>
      <p>display : {profile.displayName}</p>

      <UserLists username={profile.username} userId={profile.id} />
    </div>
  );
}

export default Profile;
