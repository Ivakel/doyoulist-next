import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import TimeIcon from "@/public/svg/time.svg"

type SkeletonWeeklyTaskList = {
    id: number
}

export default function SkeletonWeeklyTaskList({ id }: SkeletonWeeklyTaskList) {
    return (
        <li
            className="group flex items-center gap-4 rounded-md px-4 py-1 align-middle hover:cursor-pointer hover:bg-[#D9D9D9]"
            key={id}
        >
            <Skeleton className="size-5 rounded-full" />
            <div className="flex w-full items-center justify-between align-middle">
                <div className="flex flex-col gap-[1px]">
                    <Skeleton className="h-5 w-40 rounded-sm" />
                    <div className="flex items-center gap-1 align-middle">
                        <Image
                            src={TimeIcon}
                            width={20}
                            height={20}
                            alt="time icon"
                            priority
                            className="size-3 opacity-50"
                        />
                        <Skeleton className="h-4 w-20 rounded-sm" />
                    </div>
                </div>
                <Skeleton className="right-0 flex size-3 justify-end rounded-full" />
            </div>
        </li>
    )
}
