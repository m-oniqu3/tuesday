import { useQuery } from "@tanstack/react-query";
import { getListBySlug } from "../services/list";

export function useList(userId?: string, slug?: string, viewerId?: string) {
  return useQuery({
    queryKey: ["list", userId, slug, viewerId],
    queryFn: () => getListBySlug(userId!, slug!, viewerId),
    enabled: !!userId && !!slug,
  });
}
