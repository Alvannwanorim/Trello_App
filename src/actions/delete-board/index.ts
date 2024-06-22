"use server";
import { currentUser } from "@/lib/auth";
import { InputType } from "./types";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoardSchema } from "./schema";

const handler = async (data: InputType) => {
  const user = currentUser();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  const { id } = data;

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
      },
    });
    console.log(board);
  } catch (err) {
    console.log(err);

    return {
      error: "Failed to update form",
    };
  }
  revalidatePath(`/organization/${board.orgId}`);
  redirect(`/organization/${board.orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);
