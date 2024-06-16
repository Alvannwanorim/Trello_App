import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) {
    return null;
  }
  return (
    <div
      className="mt-2 text-sm text-destructive"
      id={`${id}-error`}
      aria-live="polite"
    >
      {errors?.[id]?.map((error, index) => (
        <div
          className="flex items-center font-medium p-2 border border-destructive bg-destructive/10 rounded-sm"
          key={index}
        >
          <XCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};
