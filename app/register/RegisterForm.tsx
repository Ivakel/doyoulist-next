"use client"
import { signIn, useSession } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
//Import images
import AppLogo from "@/public/svg/logo.svg"
import RegisterOptionDivider from "@/components/registerOptionDivider"
import Link from "next/link"
import GoogleLoginButton from "@/components/googleLoginButton"
import LoaderSpinner from "@/components/ui/loaderSpinner"
import { redirect } from "next/navigation"

export default function RegisterForm() {
    const formSchema = z.object({
        email: z
            .string()
            .min(1, { message: "This field has to be filled." })
            .email("This is not a valid email."),
        password: z
            .string()
            .min(8, { message: "Password must be atleast 8 characters" })
            .max(20, { message: "Password must be atmost 20 characters" }),
        username: z.string().min(3, {
            message: "Username must have a minimum of 3 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = await signIn("credentials", {
            email: values.email,
            password: values.password,
            username: values.username,
            action: "REGISTER",
            redirect: true,
            callbackUrl: "http://localhost:3000/home",
        })
    }
    return (
        <section className="relative flex h-full w-full flex-col items-center justify-center px-5 pt-28">
            <div className="absolute left-5 top-0 h-20 w-36">
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
                    <h1 className="text-center text-2xl font-medium">
                        Register to{" "}
                        <span className="font-bold text-[#575293]">
                            Orderdly
                        </span>
                    </h1>

                    <GoogleLoginButton />
                </form>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                    >
                        <RegisterOptionDivider />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl className="bg-[#F8FAFC]">
                                        <Input
                                            placeholder="Username"
                                            {...field}
                                            className="focus-visible:ring-0"
                                        />
                                    </FormControl>
                                    <FormMessage className="px-2" />
                                </FormItem>
                            )}
                        />
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
                                    <FormMessage className="px-2" />
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
                                    <FormMessage className="px-2" />
                                </FormItem>
                            )}
                        />
                        <div className="-mb-4 flex gap-2">
                            <h3 className="text-center text-sm">
                                By continuing, you agree to the{" "}
                                <Link href={"/"} className="text-[#2563EB]">
                                    Terms & Conditions
                                </Link>{" "}
                                of{" "}
                                <span className="font-bold text-[#575293]">
                                    Orderdly
                                </span>
                            </h3>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#8C83C9] hover:bg-[#a398e9]"
                        >
                            Create account
                        </Button>
                    </form>
                    <h3 className="flex justify-center pt-6 text-sm">
                        Already have account?
                        <Link
                            href={"/login"}
                            className="font-medium text-[#2563EB]"
                        >
                            &nbsp;Log in
                        </Link>
                    </h3>
                </Form>
            </section>
        </section>
    )
}
