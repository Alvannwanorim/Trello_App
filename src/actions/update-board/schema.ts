import { z } from "zod";

export const UpdatedBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "",
    }),
  id: z.string(),
});
