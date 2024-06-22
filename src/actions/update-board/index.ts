"use server";
import { currentUser } from "@/lib/auth";
import { InputType } from "./types";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdatedBoardSchema } from "./schema";

const handler = async (data: InputType) => {
  const user = currentUser();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  const { title, id } = data;

  let board;
  try {
    board = await db.board.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    console.log(board);
  } catch (err) {
    console.log(err);

    return {
      error: "Failed to update form",
    };
  }
  revalidatePath(`/organization/${board.orgId}/board/${board.id}`);

  return { data: board };
};

export const updateBoard = createSafeAction(UpdatedBoardSchema, handler);
