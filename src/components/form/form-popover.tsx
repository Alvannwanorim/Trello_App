"use client";
import React, { ElementRef, useRef, useState } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FormInput } from "./form-input";
import FormSubmit from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import FileUpload from "../global/file-upload";
import { FormSelect } from "./form-select";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}
const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onFileUpload = (url: string) => {
    setFile(url);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const file = formData.get("file") as string;
    const organization = formData.get("organization") as string;

    execute({ title, file, organization });
    formData.forEach(function (val, key, fD) {
      formData.delete(key);
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 outline-none"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <FileUpload
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onFileUpload={onFileUpload}
          file={file}
        />
        <form className="space-y-4" action={onSubmit} id="board">
          <div className="space-y-4">
            <FormInput
              id="file"
              type="hidden"
              errors={fieldErrors}
              defaultValue={file}
            />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
            <FormSelect
              id="organization"
              label="select organization"
              placeholder="select organization"
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
