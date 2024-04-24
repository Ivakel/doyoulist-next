"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import Google from "@/public/svg/google 2.svg";
import Image from "next/image";
import { google } from "@/db/db";

export default function GoogleLoginButton() {
    const handleGoogle = async () => {
        const data = await signIn("google")
        if (!data) {
            return
        }
    }
  return (
    <Button
        className="flex gap-4 bg-[#F8FAFC] hover:bg-[#e8ebee] text-black text-base font-semibold w-full"
        type="button"
        onClick={() => {
            handleGoogle()
            }
        }
    >
        <Image src={Google} width={20} height={20} alt="google logo" />
        <span className="text-sm">Continue with google</span>
    </Button>
  )
}
