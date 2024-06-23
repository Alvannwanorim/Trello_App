"use server";
import { currentUser } from "@/lib/auth";
import { InputType } from "./types";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyListSchema } from "./schema";

const handler = async (data: InputType) => {
  const user = currentUser();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  const { id, boardId } = data;

  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return {
      error: "board not found",
    };
  }

  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return {
        error: "List ot found",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    if (listToCopy.cards.length > 0) {
      const cards = listToCopy.cards.map((card) => ({
        title: card.title,
        description: card.description,
        order: card.order,
      }));
      list = await db.list.create({
        data: {
          boardId: listToCopy.boardId,
          title: `${listToCopy.title} - Copy`,
          order: newOrder,
          cards: {
            createMany: {
              data: cards,
            },
          },
        },
        include: {
          cards: true,
        },
      });
    } else {
      list = await db.list.create({
        data: {
          boardId: listToCopy.boardId,
          title: `${listToCopy.title} - Copy`,
          order: newOrder,
        },
      });
    }
  } catch (err) {
    console.log(err);

    return {
      error: "Failed to copy list",
    };
  }
  revalidatePath(`/organization/${board.orgId}/board/${board.id}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyListSchema, handler);
