import { Board } from "@prisma/client";
import React from "react";
import BoardTileForm from "./board-title-form";
import BoardOptions from "./board-options";
interface BoardNavbarProps {
  data: Board;
}
const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-10 px-4 flex flex-row bg-background items-center">
      <BoardTileForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
