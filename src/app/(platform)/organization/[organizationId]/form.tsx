"use client";
import { createBoard, FormState } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import FormInput from "./form-input";

const Form = () => {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  const { pending } = useFormStatus();
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <Button disabled={pending} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
