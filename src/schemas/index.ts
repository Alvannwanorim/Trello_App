import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "mage/jpg"];
const MAX_FILE_SIZE = 5000000;
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

export const OrganizationsSchema = z.object({
  name: z.string().min(3, {
    message: "Minimum of 3 characters is required",
  }),
  email: z.string().email({
    message: "Field must be a valid email",
  }),
  phone: z.string().min(9, {
    message: "Minimum of 9 characters is required",
  }),
  address: z.string().min(2, {
    message: "Minimum of 2 characters is required",
  }),
  city: z.string().min(2, {
    message: "Minimum of 2 characters is required",
  }),
  zipCode: z.string().min(2, {
    message: "Minimum of 2 characters is required",
  }),
  country: z.string().min(2, {
    message: "Minimum of 2 characters is required",
  }),
});

export const FileUploadSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
