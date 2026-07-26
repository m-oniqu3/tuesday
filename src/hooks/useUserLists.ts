import { useInfiniteQuery } from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { getUserLists } from "../services/list";

// export function useUserLists(profileId?: string, viewerId?: string) {
//   return useQuery({
//     queryKey: ["lists", profileId, viewerId],

//     queryFn: () => {
//       if (!profileId) {
//         throw new Error("Profile ID is required");
//       }

//       return getUserLists(profileId, viewerId);
//     },

//     enabled: !!profileId,
//     staleTime: 1000 * 60 * 5,
//   });
// }

type Cursor = QueryDocumentSnapshot<DocumentData> | undefined;

export function useUserLists(profileId?: string, viewerId?: string) {
  return useInfiniteQuery({
    queryKey: ["lists", profileId, viewerId],

    queryFn: ({ pageParam }) => getUserLists(profileId!, viewerId, pageParam),

    initialPageParam: undefined as Cursor,

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

    enabled: !!profileId,
  });
}
