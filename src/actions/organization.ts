"use server";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { BoardSchema, OrganizationsSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import * as z from "zod";

export type FormState = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};
export const createOrg = async (
  values: z.infer<typeof OrganizationsSchema>,
  logo: string
) => {
  const user = await currentUser();
  if (!user) {
    return redirect("auth/sign-in");
  }

  const result = OrganizationsSchema.safeParse(values);
  if (!result.success) {
    return {
      error: "error processing request. check your inputs and try again",
    };
  }
  const { email, name, phone, address, city, zipCode, country } = result.data;

  const existingOrg = await db.organization.findFirst({
    where: {
      email: email as string,
    },
  });

  if (existingOrg) {
    return { error: "This email is already in use" };
  }

  await db.organization.create({
    data: {
      logo: logo,
      email,
      name,
      phone,
      city,
      address,
      zipCode,
      country,
      ownerId: user.id,
      users: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  return { success: "Organization successfully created" };
};

export const createBoard = async (
  previousState: FormState,
  formData: FormData
) => {
  try {
    const validatedField = BoardSchema.safeParse({
      title: formData.get("title"),
    });

    if (!validatedField.success) {
      return {
        errors: validatedField.error.flatten().fieldErrors,
        message: "Missing fields.",
      };
    }
    const { title } = validatedField.data;

    const board = await db.board.create({
      data: {
        title: title,
      },
    });
  } catch (err) {
    return {
      message: "Error creating board",
    };
  }
  revalidatePath("/organization/6665d3f674dbd6e120d4b2c7");
  redirect("/organization/6665d3f674dbd6e120d4b2c7");
};

export const getBoards = async () => {
  const boards = await db.board.findMany();
  return boards;
};

export const deleteBoard = async (id: string) => {
  await db.board.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/organization/6665d3f674dbd6e120d4b2c7");
};
