import { z } from "zod";

export const CreateListSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, "Name should be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description should be at least 3 characters")
    .optional()
    .or(z.literal("")),
  isPrivate: z.boolean().optional(),
});

export type CreateList = z.infer<typeof CreateListSchema>;
