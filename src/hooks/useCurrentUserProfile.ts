import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/get-user-profile";
import { useAuth } from "./useAuth";

export function useCurrentUserProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: () => getUserProfile(user!.uid),
    enabled: !!user,
  });
}
