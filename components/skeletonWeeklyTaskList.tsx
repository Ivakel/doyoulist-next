import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import TimeIcon from "@/public/svg/time.svg";

type SkeletonWeeklyTaskList = {
  id: number;
};

export default function SkeletonWeeklyTaskList({ id }: SkeletonWeeklyTaskList) {
  return (
    <li
      className="group flex align-middle items-center gap-4 px-4 py-1 rounded-md hover:bg-[#D9D9D9] hover:cursor-pointer"
      key={id}
    >
      <Skeleton className="size-5 rounded-full" />
      <div className="flex w-full justify-between items-center align-middle">
        <div className="flex flex-col gap-[1px]">
          <Skeleton className="h-5 w-40 rounded-sm" />
          <div className="flex gap-1 align-middle items-center">
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
        <Skeleton className="flex justify-end right-0 size-3 rounded-full" />
      </div>
    </li>
  );
}
