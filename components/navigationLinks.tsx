"use client"
import { useState } from "react"
import Triangle from "./ui/triangle"

type NavigationLink = {
    content: HoverComp
}

type HoverComp = "Product" | "Features" | "Pricing" | "Resources" | undefined

export default function NavigationLinks() {
    const [hoverComp, setHoverComp] = useState<HoverComp>()
    const navigationLinks: NavigationLink[] = [
        {
            content: "Product",
        },
        {
            content: "Features",
        },
        {
            content: "Pricing",
        },
        {
            content: "Resources",
        },
    ]
    return (
        <>
            {navigationLinks.map((link, key) => {
                return (
                    <span
                        key={link.content}
                        className="relative my-auto h-[2.6rem] w-24 cursor-pointer rounded-md hover:bg-slate-100"
                    >
                        <button
                            className="flex h-[2.6rem] w-24 content-center justify-center align-middle"
                            onMouseOver={() => setHoverComp(() => link.content)}
                            onFocus={() => true}
                            onMouseLeave={() => setHoverComp(() => undefined)}
                        >
                            <h3 className="my-auto">{link.content}</h3>
                        </button>
                        {<Triangle hover={link.content === hoverComp} />}
                    </span>
                )
            })}
        </>
    )
}
