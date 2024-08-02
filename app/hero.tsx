import { Button } from "@/components/ui/button"
import HoveringArrow from "@/components/ui/hoveringArrow"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative flex h-min w-[85%] flex-col items-center bg-transparent">
            <div className="mt-20 flex flex-col items-center justify-start gap-4">
                <p className="hero-text text-6xl font-bold">
                    Make your tasks easier
                </p>
                <p className="hero-text text-6xl font-bold">with help of an </p>
                <p className="hero-text text-6xl font-bold">
                    assistant<span className="text-[#FF0303]">.</span>
                </p>
            </div>
            <div className="mt-5 flex flex-col items-center justify-start text-slate-900">
                <p>Let the AI come up with best ways to do your tasks,</p>
                <p>and you focus on completing them.</p>
            </div>

            <Button className="mt-5 bg-[#8C83C9] hover:bg-[#575293]">
                <Link href="/register">Get started for free</Link>
            </Button>
            <HoveringArrow />
        </section>
    )
}
