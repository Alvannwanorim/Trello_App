import { TriangleAlertIcon } from "lucide-react";
import React from "react";

type Props = {
  message: string;
};

const FormError = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 rounded-md flex items-center gap-x-2 text-sm text-destructive p-3">
      <TriangleAlertIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
