"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Logo from "@/public/svg/logo.svg";
import { motion } from "framer-motion";
import { scaleOnHoverBUttonVariant } from "@/app/framer-motion/variants";

type Props = {
  setHover: Dispatch<SetStateAction<boolean>>;
};

export default function LogoButton({ setHover }: Props) {
  return (
    <button className="cursor-pointer z-10 p-2 hover:scale-[1.1] transition-all duration-300">
      <Image
        priority
        src={Logo}
        width={120}
        height={85}
        alt="Orderdly logo"
        onMouseOver={() => setHover(() => true)}
        onMouseLeave={() => setHover(() => false)}
      />
    </button>
  );
}
