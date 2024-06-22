"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}
const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn(className)}
      variant={variant}
      size={"sm"}
      disabled={pending || disabled}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
