import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../services/user";
import type { UserProfile } from "../types/user";

export function useUserByUsername(username?: string) {
  return useQuery<UserProfile | null>({
    queryKey: ["user", username],
    queryFn: () => getUserByUsername(username!),
    enabled: !!username,
  });
}
