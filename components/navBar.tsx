"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import NavBg from "@/public/images/nav-bg.png";

import NavigationLinks from "./navigationLinks";
import Image from "next/image";
import LogoButton from "./ui/logoButton";
import useHover from "@/hooks/useHover";

export default function NavBar() {
  const [hover, setHover] = useHover();
  return (
    <nav
      className={`relative font-medium flex h-[3.1rem] w-[90%] justify-between align-middle items-center px-2 mx-auto bg-[#faf7ff] rounded-xl ${
        hover && "transition-shadow shadow duration-300"
      }`}
    >
      <Image
        className="object-cover z-[0] rounded-xl"
        src={NavBg}
        alt="navigation background"
        fill={true}
        priority
      />
      <div className="flex gap-60">
        <LogoButton setHover={setHover} />
        <aside className="flex justify-center align-middle content-center gap-6 pr-4">
          <NavigationLinks />
        </aside>
      </div>
      <div className="flex justify-center align-middle gap-6 z-10">
        <span className="flex justify-center content-center align-middle w-24 h-[2.6rem] cursor-pointer rounded-md hover:bg-slate-100">
          <Link
            className="flex justify-center align-middle items-center"
            href="#"
          >
            Log in
          </Link>
        </span>
        <span className="flex items-center mx-auto">
          <Button className="flex justify-center align-middle items-center bg-[#8C83C9] hover:bg-[#575293]">
            <Link href="/register">Start for free</Link>
          </Button>
        </span>
      </div>
    </nav>
  );
}
