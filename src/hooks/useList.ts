import { useQuery } from "@tanstack/react-query";
import { getListBySlug } from "../services/list";
import { type List } from "../types/list";

export function useList(userId?: string, slug?: string) {
  return useQuery<List | null>({
    queryKey: ["list", userId, slug],
    queryFn: () => getListBySlug(userId!, slug!),
    enabled: !!userId && !!slug,
  });
}
