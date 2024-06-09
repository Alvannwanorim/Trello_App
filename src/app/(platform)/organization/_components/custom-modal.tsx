"use client";

import { createOrg } from "@/actions/organization";
import FormError from "@/components/form/form-error";
import FormSuccess from "@/components/form/form-success";
import FileUpload from "@/components/global/file-upload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrganizationsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
const CustomModal = ({
  setRefresh,
}: {
  setRefresh: (title: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof OrganizationsSchema>>({
    resolver: zodResolver(OrganizationsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
    },
  });

  useEffect(() => {
    const createButton = document.getElementById("create-button");
    const plusButton = document.getElementById("plus-button");

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);
    if (createButton) {
      createButton.addEventListener("click", openDialog);
    }
    if (plusButton) {
      plusButton.addEventListener("click", openDialog);
    }

    return () => {
      if (createButton) {
        createButton.removeEventListener("click", closeDialog);
      }
      if (plusButton) {
        plusButton.removeEventListener("click", closeDialog);
      }
    };
  }, []);

  const submitHandler = (values: z.infer<typeof OrganizationsSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");
      createOrg(values, file).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) {
          setSuccess(data.success);
          setIsOpen(false);
        }
      });
    });
  };
  return (
    <div className="overflow-y-scroll max-h-[90%]">
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="md:max-w-[720px]">
          <DialogHeader className="flex w-full items-center justify-center ">
            Create Organization
          </DialogHeader>
          <FileUpload
            fileError={fileError}
            file={file}
            onFileUpload={setFile}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(submitHandler)}
              className="flex flex-col gap-y-3"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name"
                          type="text"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          type="email"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="phone-number"
                          type="text"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="address"
                          type="text"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="city"
                          type="text"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Zip Code"
                          type="text"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="country"
                          type="text"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                className="w-full mt-4"
                variant={"default"}
                disabled={isPending || isLoading || !file}
              >
                Create Account
              </Button>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomModal;
