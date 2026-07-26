import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createList } from "../services/list";
import type { CreateListInput } from "../types/list";
import { useModal } from "./useModal";

export function useCreateList(userId?: string) {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: (input: CreateListInput) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      return createList(userId, input);
    },

    onSuccess: () => {
      closeModal();
      toast.success("List created");

      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed to create list");
    },
  });
}
