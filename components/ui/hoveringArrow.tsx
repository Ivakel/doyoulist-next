"use client"

import Image from "next/image"
import SquigglyArrow from "@/public/svg/Squiggly arrow.svg"

import { motion } from "framer-motion"
import { hoverButtonVariant } from "@/app/framer-motion/variants"

export default function HoveringArrow() {
    return (
        <motion.button
            className="absolute right-[42rem] top-[23.5rem] z-10"
            variants={hoverButtonVariant}
            whileHover="hover"
        >
            <Image
                src={SquigglyArrow}
                width={150}
                height={276.41}
                priority
                alt="squiggly arrow"
            />
        </motion.button>
    )
}
