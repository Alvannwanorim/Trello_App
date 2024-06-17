"use client";
import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Organization } from "@prisma/client";
import { useOrganization } from "@/context/organization-context";

interface FormSelectProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}
export const FormSelect = forwardRef<HTMLMapElement, FormSelectProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    const { currOrg } = useOrganization();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-muted-foreground"
            >
              {label}
            </Label>
          ) : null}
          <Select name={id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={currOrg?.id ? currOrg?.id : ""}>
                  {currOrg?.name}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
