"use server";

import db from "./db";

export const userOrg = async (userId: string) => {
  const orgs = await db.organization.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  return orgs;
};
