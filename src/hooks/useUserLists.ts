import { useQuery } from "@tanstack/react-query";
import { getUserLists } from "../services/list";

export function useUserLists(profileId?: string, viewerId?: string) {
  return useQuery({
    queryKey: ["lists", profileId, viewerId],

    queryFn: () => {
      if (!profileId) {
        throw new Error("Profile ID is required");
      }

      return getUserLists(profileId, viewerId);
    },

    enabled: !!profileId,
    staleTime: 1000 * 60 * 5,
  });
}
