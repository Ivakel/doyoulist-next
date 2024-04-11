"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PP from "@/public/images/ian-dooley-lURrgmL9Hbw-unsplash.jpg";
import DropDownArrow from "@/public/svg/arrow-down.svg";
import Bell from "@/public/images/icons8-notification-bell-100.png";
import AddButton from "@/components/addButton";
import TodayList from "@/components/todayList";
import WeeklyList from "@/components/weeklyList";
import TaskInstructions from "@/components/taskInstructions";

import { TaskDisplayContextProvider } from "@/context/taskDisplayContext";
import Provider from "@/components/Provider";


export default async function page() {
  
  return (
    <Provider>
    <TaskDisplayContextProvider>
      <section className="flex">
        <section className="flex flex-col lg:w-[410px] h-[100vh]">
          <div className="flex items-center p-6 justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={PP}
                alt="profile picture"
                width={85}
                height={85}
                priority
                className="inline-block size-10 rounded-full p-[2px] bg-[#00C898]"
              />

              <h3 className="font-medium">Ivakele</h3>

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
                src={Bell}
                width={20}
                height={20}
                alt="notification bell"
              />
              <Button className="bg-[#8C83C9]">Focus</Button>
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
    </TaskDisplayContextProvider>
    </Provider>
  );
}
