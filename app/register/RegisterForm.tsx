"use client";
import { signIn, signOut, useSession } from "next-auth/react";
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
import TermsAgree from "@/components/termsAgree";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/home");
  }
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" })
      .max(20, { message: "Password must be atmost 20 characters" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "http://localhost:3000/home",
    });
  }
  return (
    <section className="w-full h-full flex flex-col justify-center items-center relative px-5 pt-36">
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
        <form className="space-y-6">
          <h1 className="text-2xl text-center font-medium">
            Register to{" "}
            <span className="text-[#575293] font-bold">Orderdly</span>
          </h1>

          <Button
            className="flex gap-4 bg-[#F8FAFC] hover:bg-[#e8ebee] text-black text-base font-semibold w-full"
            type="button"
            onClick={() => signIn("google")}
          >
            <Image src={Google} width={20} height={20} alt="google logo" />
            <span className="text-sm">Continue with google</span>
          </Button>
        </form>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
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
            <TermsAgree />
            <Button
              type="submit"
              className="w-full bg-[#8C83C9] hover:bg-[#a398e9]"
            >
              Create account
            </Button>
          </form>
          <h3 className="pt-6 text-sm flex justify-center">
            Already have account?
            <Link href={"/login"} className="text-[#2563EB]">
              &nbsp;Log in
            </Link>
          </h3>
        </Form>
      </section>
    </section>
  );
}
