import { z } from "zod";

export const CreateListSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "title must must have more than 3 characters",
    }),
  boardId: z.string(),
});
