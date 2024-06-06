import { cookies } from "next/headers";
import { decrypt } from "./jwt";
import db from "./db";

export const getSession = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const currentUser = async () => {
  const session = await getSession();
  if (!session) return null;

  const user = db.user.findUnique({
    where: {
      id: session.id as string,
    },
  });
  return user;
};

export const currentUserOrg = async () => {
  const session = await getSession();
  if (!session) return null;

  const organization = db.organization.findFirst({
    where: {
      users: {
        some: {
          id: session?.id as string,
        },
      },
    },
  });
  return organization;
};
