import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../services/user";

export function useUserProfile(username?: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserByUsername(username!),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}
