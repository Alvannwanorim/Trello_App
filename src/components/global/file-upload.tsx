import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormError from "../form/form-error";
import Image from "next/image";
import { X } from "lucide-react";
import Loading from "./loading";

interface FileUploadProps {
  fileError: string;
  file: string;
  onFileUpload: (url: string) => void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}
const FileUpload = ({
  fileError,
  file,
  onFileUpload,
  isLoading,
  setIsLoading,
}: FileUploadProps) => {
  const handleChange = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0]; // Correctly getting the file from the input
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result;

      setIsLoading(true);

      try {
        const response = await fetch("/api/uploads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: base64String }),
        });

        const data = await response.json();
        setIsLoading(false);
        onFileUpload(data.url); // Pass the uploaded file URL back to the parent component
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsLoading(false);
      }
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleResetFile = () => {
    onFileUpload("");
  };

  if (file) {
    return (
      <div className="flex items-center justify-center relative border w-[50%] p-3 m-auto rounded-md">
        <div className="absolute top-0 right-0 cursor-pointer">
          <X className="h-4 w-4" onClick={handleResetFile} />
        </div>
        <Image src={file} alt="" height={100} width={100} />
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <Label>Organization Logo</Label>
        <Input
          className="block w-full text-sm text-slate-500
                          file:mr-4 file:px-4
                          file:rounded-md file:border-0
                          file:text-md file:font-semibold
                          file:bg-background file:text-violet-600
                          hover:file:bg-accent"
          placeholder=""
          type="file"
          onChange={handleChange}
        />

        <FormError message={fileError} />
      </div>
    </>
  );
};

export default FileUpload;
