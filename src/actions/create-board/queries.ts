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
