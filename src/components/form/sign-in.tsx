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
import { LoginSchema } from "@/schemas";
import React, { useEffect, useState, useTransition } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormError from "@/components/form/form-error";

import { useRouter } from "next/navigation";
import { signIn } from "@/actions/sign-in";

const SignInForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const submitHandler = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      setError("");
      signIn(values).then((data) => {
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal text-slate-700"
                    >
                      <Link href="/auth/reset">Forgot Password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />

            <Button
              type="submit"
              className="w-full mt-4"
              variant={"default"}
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </FormProvider>

        <Button
          size="sm"
          variant="link"
          asChild
          className="px-0 font-normal text-slate-700 text-sm"
        >
          <Link href="/auth/sign-up">{"Don't"} have an account?</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
