"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import db from "@/lib/db";
import * as bcrypt from "bcryptjs";
import { encrypt } from "@/lib/jwt";
import { cookies } from "next/headers";

export const signUp = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validationsResults = RegisterSchema.safeParse(values);
    if (!validationsResults.success) {
      return { error: "invalid data" };
    }
    const userData = validationsResults.data;

    const existingUser = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      return { error: "Email already exist" };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await db.user.create({
      data: {
        name: userData.first_name + userData.last_name,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword,
      },
    });

    const curr = new Date(Date.now());
    const expires = curr.setDate(curr.getHours() + 1);
    const session = await encrypt({ name: user.name, id: user.id });

    cookies().set("session", session, { expires, httpOnly: true });

    return { success: "user created" };
  } catch (err) {
    console.log(err);

    return { error: "Error creating account" };
  }
};
