"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import React, { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormError from "@/components/form/form-error";
import FormSuccess from "./form-success";
import { signUp } from "@/actions/sign-up";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });
  const submitHandler = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      setError("");
      signUp(values).then((data) => {
        if (data?.error) setError(data.error);
        if (data.success) {
          setSuccess(data.success);
          router.push("/");
        }
      });
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex w-full items-center justify-center">
        <CardTitle>
          <Image src={"/logo_.svg"} width={80} height={80} alt="logo" />
        </CardTitle>
        <CardDescription>Welcome back</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="flex md:flex-row gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="first name"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="last name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        type="password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal text-slate-700"
                    >
                      <Link href="/auth/reset">Forgot Password?</Link>
                    </Button>
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
              disabled={isPending}
            >
              Create Account
            </Button>
          </form>
        </FormProvider>

        <Button
          size="sm"
          variant="link"
          asChild
          className="px-0 font-normal text-slate-700 text-sm"
        >
          <Link href="/auth/sign-in">Already have an account?</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
