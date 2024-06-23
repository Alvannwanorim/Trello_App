"use client";
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./list-options";

const ListHeader = ({ list }: { list: List }) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    execute({ title, id, boardId });
  };
  return (
    <div
      className="pt-2
   px-2 text-sm font-semibold flex justify-between items-start gap-x-2"
    >
      {isEditing ? (
        <form className="flex-1 px-[2px" ref={formRef} action={onSubmit}>
          <input type="hidden" id="id" name="id" value={list.id} />
          <input
            type="hidden"
            id="boardId"
            name="boardId"
            value={list.boardId}
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title"
            defaultValue={list.title}
            className="text-sm px-2.5 py-1 h-full font-medium hover:border-none focus-within:border-none transition truncate bg-transparent outline-none focus:outline-none"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium "
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={() => {}} data={list} />
    </div>
  );
};

export default ListHeader;
