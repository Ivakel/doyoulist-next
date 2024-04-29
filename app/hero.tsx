import { Button } from "@/components/ui/button";
import HoveringArrow from "@/components/ui/hoveringArrow";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col h-min items-center bg-transparent w-[85%]">
      <div className="flex flex-col gap-4 justify-start items-center mt-20">
        <p className="hero-text text-6xl font-bold">Make your tasks easier</p>
        <p className="hero-text text-6xl font-bold">with help of an </p>
        <p className="hero-text text-6xl font-bold">
          assistant<span className="text-[#FF0303]">.</span>
        </p>
      </div>
      <div className="flex flex-col justify-start items-center mt-5 text-slate-900">
        <p>Let the AI come up with best ways to do your tasks,</p>
        <p>and you focus on completing them.</p>
      </div>

      <Button className="mt-5 bg-[#8C83C9] hover:bg-[#575293]">
        <Link href="/register">Get started for free</Link>
      </Button>
      <HoveringArrow />
    </section>
  );
}
