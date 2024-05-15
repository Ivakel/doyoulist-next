"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import Google from "@/public/svg/google 2.svg";
import Image from "next/image";
import { google } from "@/db/db";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState<boolean>(false)
  const handleGoogle = async () => {
    const data = await signIn("google").then((data) => {
      console.log(data);
    });
  };
  return (
    <Button
      className={`flex gap-4 bg-[#F8FAFC] hover:bg-[#e8ebee] text-black text-base font-semibold w-full ${loading? "opacity-70": ""}`}
      type="button"
      disabled={loading}
      onClick={() => {
        setLoading(true)
        handleGoogle();
        setLoading(false)
      }}
    >
      <Image src={Google} width={20} height={20} alt="google logo" />
      <span className="text-sm">Continue with google</span>
    </Button>
  );
}
