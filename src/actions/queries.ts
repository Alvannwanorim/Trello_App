"use server";

import db from "@/lib/db";

export const getBoard = async (boardId: string, organizationId: string) => {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId: organizationId,
    },
  });

  return board;
};

export const getLists = async (boardId: string) => {
  const lists = await db.list.findMany({
    where: {
      boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return lists;
};
