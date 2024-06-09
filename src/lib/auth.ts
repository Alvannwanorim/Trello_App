"use server";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "./jwt";
import db from "./db";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const getSession = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const currentUser = async () => {
  const session = await getSession();
  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.id as string,
    },
  });

  return user;
};

export const currentUserOrg = async () => {
  const session = await getSession();
  if (!session) return null;

  const organization = await db.organization.findFirst({
    where: {
      ownerId: session.id as string,
    },
  });

  return organization;
};

export const logout = () => {
  cookies().set("session", "", { expires: new Date(0) });
  return redirect("/");
};

export const updateSession = async (req: NextRequest) => {
  const session = req.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 1000 * 60 * 1);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date,
  });
  return res;
};
