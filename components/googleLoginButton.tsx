"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import Google from "@/public/svg/google 2.svg"
import Image from "next/image"
import { google } from "@/db/db"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function GoogleLoginButton() {
    const [loading, setLoading] = useState<boolean>(false)
    const handleGoogle = async () => {
        const data = await signIn("google")
    }
    return (
        <Button
            className={`flex w-full gap-4 bg-[#F8FAFC] text-base font-semibold text-black hover:bg-[#e8ebee] ${loading ? "opacity-70" : ""}`}
            type="button"
            disabled={loading}
            onClick={() => {
                setLoading(true)
                handleGoogle()
                setLoading(false)
            }}
        >
            <Image src={Google} width={20} height={20} alt="google logo" />
            <span className="text-sm">Continue with google</span>
        </Button>
    )
}
