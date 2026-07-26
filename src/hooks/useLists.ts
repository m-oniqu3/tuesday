import { useQuery } from "@tanstack/react-query";
import { getUserLists } from "../services/list";

export function useUserLists(userId?: string) {
  return useQuery({
    queryKey: ["lists", userId],
    queryFn: () => getUserLists(userId!),
    enabled: !!userId,
  });
}
