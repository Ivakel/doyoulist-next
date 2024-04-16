"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
//Import images
import AppLogo from "@/public/svg/logo.svg";
import Google from "@/public/svg/google 2.svg";
import RegisterOptionDivider from "@/components/registerOptionDivider";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" })
      .max(20, { message: "Password must be atmost 20 characters" }),
    action: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      action: "LOGIN",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const results = signIn("credentials", {
      email: values.email,
      password: values.password,
      action: "LOGIN",
      redirect: true,
      callbackUrl: "/home",
    });
    console.log(results);
  }
  return (
    <section className="w-full h-full flex flex-col justify-center items-center relative px-5 sm:pt-40">
      <div className="absolute h-20 w-36 top-5 left-5">
        <Image
          className=""
          src={AppLogo}
          fill={true}
          priority
          alt="application logo"
        />
      </div>
      <section className="xl:w-96">
        <form
          action="http://localhost:3000/api/auth/signin/google"
          method="POST"
        >
          <h1 className="text-2xl text-center font-medium">
            Log in to <span className="text-[#575293] font-bold">Orderdly</span>
          </h1>

          <Button
            className="flex gap-4 bg-[#F8FAFC] hover:bg-[#e8ebee] text-black text-base font-semibold w-full"
            type="submit"
            // onClick={() => signIn("google")}
          >
            <Image src={Google} width={20} height={20} alt="google logo" />
            <span className="text-sm">Continue with google</span>
          </Button>
        </form>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 xl:w-96"
        ></form>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 xl:w-96"
          >
            <RegisterOptionDivider />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-[#F8FAFC]">
                    <Input
                      placeholder="Email"
                      {...field}
                      className="focus-visible:ring-0"
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
                  <FormControl className="bg-[#F8FAFC]">
                    <Input
                      placeholder="Password"
                      {...field}
                      className="focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#8C83C9] hover:bg-[#a398e9]"
            >
              Log in
            </Button>
          </form>
          <h3 className="pt-6 text-sm">
            {"Don't"} have account?{" "}
            <Link href={"/register"} className="text-[#2563EB]">
              Create account
            </Link>
          </h3>
        </Form>
      </section>
    </section>
  );
}
