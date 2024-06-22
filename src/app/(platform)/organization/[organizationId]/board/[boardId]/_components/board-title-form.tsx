"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { Edit2Icon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
interface BoardTileFormProps {
  data: Board;
}
const BoardTileForm = ({ data }: BoardTileFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log(title);

    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit}>
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lag font-bold px=[7px] py-1 h-7 transparent focus-visible:outline-1 focus-visible:ring-slate-200 border-1 "
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant={"ghost"}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {data.title}
      <Edit2Icon className="h-2 w-2 ml-1" />
    </Button>
  );
};

export default BoardTileForm;
