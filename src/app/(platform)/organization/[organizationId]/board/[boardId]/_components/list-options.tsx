import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormInput } from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { toast } from "sonner";
interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}
const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeCopyList } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" Copied!`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ id, boardId });
  };
  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeCopyList({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild ref={closeRef}>
        <Button className="h-auto w-auto pb-3" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 relative h-fu"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-medium text-center">List actions</div>
        <PopoverClose asChild>
          <Button
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute right-0 top-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant={"ghost"}
          className="rounded-none w-full h-auto p-2 mt-0 px-5 font-normal text-sm flex items-center justify-start mx-auto hover:font-semibold transition-all"
        >
          Add card
        </Button>
        <form action={onCopy}>
          <input type="hidden" id="id" name="id" value={data.id} />
          <input
            type="hidden"
            id="boardId"
            name="boardId"
            value={data.boardId}
          />
          <FormSubmit
            variant={"ghost"}
            className="rounded-none w-full h-auto p-2 mt-0 px-5 font-normal text-sm flex items-center justify-start mx-auto hover:font-semibold transition-all "
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input type="hidden" id="id" name="id" value={data.id} />
          <input
            type="hidden"
            id="boardId"
            name="boardId"
            value={data.boardId}
          />
          <FormSubmit
            variant={"ghost"}
            className="rounded-none w-full h-auto p-2 mt-0 px-5 font-semibold text-sm flex items-center justify-start mx-auto  text-destructive/70 hover:text-destructive/90 hover:font-bold transition-all "
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
