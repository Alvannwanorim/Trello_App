import { z } from "zod";
export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    }),
  file: z
    .string({
      required_error: "board  image is required",
      invalid_type_error: "Board image is required",
    })
    .min(3, {
      message: "file is required",
    }),
  organization: z
    .string({
      required_error: "organization id is required",
      invalid_type_error: "organization id image is required",
    })
    .min(3, {
      message: "organization id is required",
    }),
});
