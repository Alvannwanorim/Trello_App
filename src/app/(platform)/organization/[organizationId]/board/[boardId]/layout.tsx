import { getBoard } from "@/actions/create-board/queries";

import React from "react";
import ErrorPage from "./not-found";
import BoardNavbar from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: {
    boardId: string;
    organizationId: string;
  };
}) {
  const board = await getBoard(params.boardId, params.organizationId);

  return {
    title: board?.title || "Board",
  };
}
const BoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
    organizationId: string;
  };
}) => {
  const board = await getBoard(params.boardId, params.organizationId);
  if (!board) {
    return <ErrorPage />;
  }

  return (
    <div>
      <div className="">
        <BoardNavbar data={board} />
        {children}
      </div>
    </div>
  );
};

export default BoardLayout;
