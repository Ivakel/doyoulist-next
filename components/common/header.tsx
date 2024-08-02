"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Typography from "@/components/ui/typography"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuIcon, X } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className }: SidebarProps) {
    const pathname = usePathname()
    const items = [
        {
            href: "https://map.sistilli.dev/public/coding/SaaS+Boilerplate",
            title: "Book a demo",
            openInNewTab: true,
        },
        // { href: '#pricing', title: 'Features' },
        // {
        //   href: 'mailto:myemail@.com',
        //   title: 'Contact Us'
        // }
    ]

    const getLogo = () => (
        <Link href="/" className="pointer flex items-center">
            <img src="/logo.svg" className="mr-3" />
            <Typography className="!text-base font-medium !text-white">
                Pandem
            </Typography>
        </Link>
    )

    const getAuthButtons = () => (
        <div className="flex items-center gap-3">
            <Link
                href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
                target="_blank"
            >
                <Typography variant="p">Login</Typography>
            </Link>
            <Link
                href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
                target="_blank"
            >
                <Button size="tiny" color="ghost">
                    <Typography variant="p" className="text-black">
                        Sign Up
                    </Typography>
                </Button>
            </Link>
        </div>
    )

    const getHeaderItems = () => {
        return (
            <>
                {items.map((item) => {
                    const selected =
                        pathname === item.href || pathname.includes(item.href)
                    return (
                        <Link
                            href={item.href}
                            className="pointer block w-fit"
                            target={item.openInNewTab ? "_blank" : ""}
                            key={item.title}
                        >
                            <Typography
                                variant="p"
                                className={cn(selected && "text-primary")}
                            >
                                {item.title}
                            </Typography>
                        </Link>
                    )
                })}
            </>
        )
    }

    return (
        <div
            className={cn(
                `flex h-14 w-full items-center justify-center border-b md:h-12`,
                className,
            )}
        >
            <div className="w-full max-w-[1280px] px-4 md:px-8">
                {/* Desktop */}
                <div className="flex w-full items-center gap-x-8">
                    <div className="md:flex-0 min-w-fit flex-1">
                        {getLogo()}
                    </div>
                    <div className="flex hidden w-full items-center md:flex">
                        <div className="flex flex-1 items-center gap-x-8">
                            {getHeaderItems()}
                        </div>
                        {getAuthButtons()}
                    </div>
                    {/* Mobile */}
                    <div className="flex items-center gap-x-4 md:hidden">
                        {getAuthButtons()}
                        <Drawer direction="right">
                            <DrawerTrigger asChild>
                                <MenuIcon />
                            </DrawerTrigger>
                            <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-64 rounded-none">
                                <div className="mx-auto w-full p-5">
                                    <DrawerHeader>
                                        <DrawerClose asChild>
                                            <div className="flex w-full items-end justify-end">
                                                <X />
                                            </div>
                                        </DrawerClose>
                                    </DrawerHeader>
                                    <div className="space-y-4 p-4 pb-0">
                                        {getHeaderItems()}
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
        </div>
    )
}
