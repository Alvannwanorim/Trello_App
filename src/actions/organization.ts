"use server";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { OrganizationsSchema } from "@/schemas";
import { Phone } from "lucide-react";
import { redirect } from "next/navigation";

import * as z from "zod";
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
