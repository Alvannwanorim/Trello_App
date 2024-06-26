"use server";

import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = currentUser();

  if (!user) {
    return redirect("/auth/sing-in");
  }
  const { title, organization, file } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId: organization,
        imageUrl: file,
      },
    });
  } catch (err) {
    return {
      error: "Failed to create board.",
    };
  }
  revalidatePath(`organization/${board.orgId}/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoardSchema, handler);
