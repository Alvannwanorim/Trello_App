import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Field must be a valid email",
  }),
  password: z.string().min(1, {
    message: "minimum of 1 character is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Field must be a valid email",
  }),
  password: z.string().min(1, {
    message: "minimum of 1 character is required",
  }),
  first_name: z.string().min(3, {
    message: "minimum of 3 character is required",
  }),
  last_name: z.string().min(3, {
    message: "minimum of 3 character is required",
  }),
});
