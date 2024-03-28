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
import TaskListItem from "./TodayTaskListItem";
import { TodayTaskItem } from "@/lib/types";
import { axiosInstance } from "@/middleware/axios";


export default function TodayList() {
  const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState<TodayTaskItem[]>([]);
  const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false);

  useEffect(() => {
    fetchTodos(); // Fetch todos when component mounts or when triggerRefetch changes
  }, [triggerRefetch]);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/api/tasks/today"); // Replace with your actual API endpoint
      const tasks = await response.data.data;
      console.log(tasks)
      setTasks(tasks as TodayTaskItem[]);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const summery = ["laundry", "homework", "pancakes", "shopping"];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <CollapsibleTrigger asChild>
        <button className="flex hover:bg-[#eeeded] rounded-md p-2 transition-colors duration-300 z-10 lg:w-[360px]">
          <DateBox />
          <div>
            <div className="list-none flex">
              <div className="p-1">
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
            <TaskListItem
              setTriggerRefetch={setTriggerRefetch}
              id={task.id}
              taskName={task.taskName}
              dueTime={task.dueTime}
              complete={task.complete}
            />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
