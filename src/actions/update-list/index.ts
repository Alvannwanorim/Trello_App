"use server";
import { currentUser } from "@/lib/auth";
import { InputType } from "./types";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdatedListSchema } from "./schema";

const handler = async (data: InputType) => {
  const user = currentUser();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  const { title, id, boardId } = data;

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

  let list;
  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
      },
      data: {
        title,
      },
    });
  } catch (err) {
    console.log(err);

    return {
      error: "Failed to update form",
    };
  }
  revalidatePath(`/organization/${board.orgId}/board/${board.id}`);

  return { data: list };
};

export const updateList = createSafeAction(UpdatedListSchema, handler);
