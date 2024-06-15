import { Input } from "@/components/ui/input";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
interface FormInputProps {
  errors?: {
    title?: string[];
  };
}
const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        type="text"
        name="title"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors?.title?.map((error: string) => (
            <p key={error} className="text-destructive">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
