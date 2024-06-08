"use server";
import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import db from "@/lib/db";
import * as bcrypt from "bcryptjs";
import { encrypt } from "@/lib/jwt";
import { cookies } from "next/headers";

export const signIn = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validationsResults = LoginSchema.safeParse(values);
    if (!validationsResults.success) {
      return { error: "invalid data" };
    }
    const userData = validationsResults.data;

    const existingUser = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "User not found" };
    }

    const isMatch = await bcrypt.compare(
      userData.password,
      existingUser.password
    );
    if (!isMatch) {
      return { error: "Invalid credentials" };
    }

    const curr = new Date(Date.now());
    const expires = curr.setDate(curr.getDate() + 1);
    const session = await encrypt({
      name: existingUser.name,
      id: existingUser.id,
    });

    cookies().set("session", session, { expires, httpOnly: true });

    return { success: "login successful" };
  } catch (err) {
    console.log(err);

    return { error: "Error creating account" };
  }
};
