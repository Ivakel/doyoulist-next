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
import TaskFormContainer from "@/components/task-form/TaskFormContainer";
import { Toaster } from "@/components/ui/toaster";
export default function HomePage() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoaderSpinner />;
  }
  return (
    <section className="relative flex">
      <section className="flex h-[100vh] flex-col sm:w-[350px] md:w-[350px] lg:w-[350px]">
        <div className="flex items-center justify-between p-6">
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

          <div className="flex items-center gap-4">
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
      <section className="relative flex h-[100vh] w-[70%] justify-center px-10">
        <TaskFormContainer />
        <div className="pattern-background absolute left-0 top-0 -z-10 flex h-full w-full justify-center align-middle" />
        <TaskInstructions />
      </section>
      <Toaster />
    </section>
  );
}
