import { deleteBoard } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import React from "react";

const Board = ({ title, id }: { title: string; id: string }) => {
  const deleteBoardAction = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardAction} className="flex items-center gap-x-2">
      <p>Board title: {title}</p>
      <Button variant={"destructive"} size={"sm"} type="submit">
        <Delete className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default Board;
