"use client";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import DropDownArrow from "@/public/svg/arrow-down.svg";
import DateBox from "./dateBox";
import CountCircle from "./ui/countCircle";
import Image from "next/image";
import { HandleTodoActionTypes, TodayTaskItem } from "@/lib/types";

import { axiosInstance } from "@/middleware/axios";
import WeeklyTaskList from "./weeklyTaskList";

export default function WeeklyList() {
    const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState<TodayTaskItem[]>([]);
  const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false);
  useEffect(() => {
    fetchTodos(); // Fetch todos when component mounts or when triggerRefetch changes
  }, [triggerRefetch]);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/api/tasks/weekly"); // Replace with your actual API endpoint
      const data = await response.data;
      console.log(data.tasks);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const summery = ["wedding", "physics assignment"];
  
  return <Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}
  className="space-y-2"
>
  <CollapsibleTrigger asChild>
    <button className="flex lg:w-[360px] hover:bg-[#eeeded] rounded-md p-2 transition-colors duration-300 z-10">
      <DateBox />
      <div>
        <div className="list-none flex justify-between">
          <div className="flex flex-col p-1 mr-auto">
            <h1 className="font-semibold text-left transition-all duration-300">
              Today
            </h1>

            <h3 className="font-medium text-xs text-slate-500 ml-1 text-left lg:w-[235px]">
              {summery.join(">")}
            </h3>
          </div>
          
            <CountCircle count={tasks.length} />
            <div className="mt-[15px] ml-5 size-4">
                <Image
                src={DropDownArrow}
                alt="dropdown arrow"
                width={30}
                height={30}
                className={`${
                    isOpen
                    ? "rotate-180 transition-all duration-300"
                    : "transition-all duration-300"
                }`}
                />
            </div>
         
        </div>
      </div>
    </button>
  </CollapsibleTrigger>
  <CollapsibleContent className="space-y-2">
    <ul className="list-none gap-2">
      {tasks.map((task) => (
        <WeeklyTaskList
          setTriggerRefetch={setTriggerRefetch}
          id={task.id}
          taskName={task.taskName}
          dueDate={task.dueDate}
          complete={task.complete}
        />
      ))}
    </ul>
  </CollapsibleContent>
</Collapsible>
}

