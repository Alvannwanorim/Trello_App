import { createBoard, getBoards } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import React from "react";
import Board from "./board";
import Form from "./form";

const Page = async () => {
  const boards = await getBoards();
  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="flex flex-col">
        {boards.map((board, index) => (
          <Board key={index} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  );
};

export default Page;
