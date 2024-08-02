"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import NavBg from "@/public/images/nav-bg.png"

import NavigationLinks from "./navigationLinks"
import Image from "next/image"
import LogoButton from "./ui/logoButton"
import useHover from "@/hooks/useHover"

export default function NavBar() {
    const [hover, setHover] = useHover()
    return (
        <nav
            className={`relative mx-auto flex h-[3.1rem] w-[90%] items-center justify-between rounded-xl bg-[#faf7ff] px-2 align-middle font-medium ${
                hover && "shadow transition-shadow duration-300"
            }`}
        >
            <Image
                className="z-[0] rounded-xl object-cover"
                src={NavBg}
                alt="navigation background"
                fill={true}
                priority
            />
            <div className="flex gap-60">
                <LogoButton setHover={setHover} />
                <aside className="flex content-center justify-center gap-6 pr-4 align-middle">
                    <NavigationLinks />
                </aside>
            </div>
            <div className="z-10 flex justify-center gap-6 align-middle">
                <span className="flex h-[2.6rem] w-24 cursor-pointer content-center justify-center rounded-md align-middle hover:bg-slate-100">
                    <Link
                        className="flex items-center justify-center align-middle"
                        href="/login"
                    >
                        Log in
                    </Link>
                </span>
                <span className="mx-auto flex items-center">
                    <Button className="flex items-center justify-center bg-[#8C83C9] align-middle hover:bg-[#575293]">
                        <Link href="/register">Start for free</Link>
                    </Button>
                </span>
            </div>
        </nav>
    )
}
