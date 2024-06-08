import { CheckCircleIcon, TriangleAlertIcon } from "lucide-react";
import React from "react";

type Props = {
  message: string;
};

const FormSuccess = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="bg-accent/15 rounded-md flex items-center gap-x-2 text-sm text-emerald-300 p-3">
      <CheckCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
