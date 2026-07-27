import { useQuery } from "@tanstack/react-query";
import { getLists } from "../services/list";

export function useLists(userId?: string) {
  return useQuery({
    queryKey: ["lists", userId],
    queryFn: () => getLists(userId!),
    enabled: !!userId,
  });
}
