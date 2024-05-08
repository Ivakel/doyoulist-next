"use client";
import Image from "next/image";
import DropDownArrow from "@/public/svg/arrow-down.svg";
import Bell from "@/public/svg/Bell-purple.svg";
import AddButton from "@/components/addButton";
import TodayList from "@/components/todayList";
import WeeklyList from "@/components/weeklyList";
import TaskInstructions from "@/components/taskInstructions";
import { useSession } from "next-auth/react";

import LoaderSpinner from "@/components/ui/loaderSpinner";
import LogOutButton from "@/components/logOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
export default function HomePage() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoaderSpinner />;
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className="relative flex">
      <section className="flex flex-col lg:w-[410px] h-[100vh]">
        <div className="flex items-center p-6 justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="inline-block size-8 rounded-full">
              <AvatarImage src={`${session?.user?.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h3 className="font-medium">{session?.user?.name}</h3>

            <button className="items-center">
              <Image
                src={DropDownArrow}
                alt="dropdown arrow"
                width={20}
                height={20}
                priority
              />
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <Image
              className="size-4"
              src={Bell}
              width={20}
              height={20}
              alt="notification bell"
            />
            <LogOutButton path="/login" />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <AddButton />
          <TodayList />
          <WeeklyList />
        </div>
      </section>
      <section className="flex justify-center h-[100vh] w-[70%] relative px-10">
        <div className="pattern-background w-full h-full flex justify-center align-middle -z-10 absolute left-0 top-0" />
        <TaskInstructions />
      </section>
    </section>
  );
}
