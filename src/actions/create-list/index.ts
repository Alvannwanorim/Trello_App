"use server";

import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = currentUser();

  if (!user) {
    return redirect("/auth/sing-in");
  }
  const { title, boardId } = data;

  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return {
      error: "Board not found",
    };
  }

  const latList = await db.list.findFirst({
    where: { boardId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = latList ? latList.order + 1 : 1;
  let list;

  try {
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (err) {
    return {
      error: "Failed to create board.",
    };
  }
  revalidatePath(`organization/${board.orgId}/board/${board.id}`);
  return { data: list };
};

export const createList = createSafeAction(CreateListSchema, handler);
