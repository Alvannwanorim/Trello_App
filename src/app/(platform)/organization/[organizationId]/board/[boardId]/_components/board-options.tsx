"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";

import { MoreHorizontal, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
interface BoardOptionsInterface {
  id: string;
}
const BoardOptions = ({ id }: BoardOptionsInterface) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id: id });
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button asChild className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center">Board actions</div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant={"ghost"}
          onClick={onDelete}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          disabled={isLoading}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
