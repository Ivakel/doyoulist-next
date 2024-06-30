"use client";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import DateBox from "./dateBox";
import CountCircle from "./ui/countCircle";
import { OneTimeTaskType, TodayTaskItem } from "@/lib/types";

import { axiosInstance } from "@/lib/axios";

import SkeletonWeeklyTaskList from "./skeletonWeeklyTaskList";
import { ChevronDown } from "lucide-react";
import { type Session } from "next-auth";
import OnetimeTask from "./onetimeTask";

type Props = {
  session: Session;
};

export default function OnetimeTasksList({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<OneTimeTaskType[]>([]);

  const emptyArray = [1, 2, 3];
  useEffect(() => {
    fetchOnetimeTasks(); // Fetch todos when component mounts or when triggerRefetch changes
  }, []);

  const fetchOnetimeTasks = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/tasks/onetime?user=${session.user?.email}`,
      ); // Replace with your actual API endpoint
      const tasks = await response.data.tasks.sort(
        (task1: TodayTaskItem, task2: TodayTaskItem) =>
          task1.id < task2.id ? 1 : task1.id > task2.id ? -1 : 0,
      );

      setTasks(tasks as OneTimeTaskType[]);
      setLoading((prev) => false);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const summery = ["wedding", "physics assignment"];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger asChild>
        <button className="z-10 flex items-center rounded-md p-2 transition-colors duration-300 hover:bg-[#f7f7f7] dark:hover:bg-[#303177] lg:w-[305px]">
          <DateBox />
          <div>
            <div className="flex list-none justify-between">
              <div className="mr-auto flex flex-col p-1 md:w-[230px]">
                <h1 className="text-left font-semibold transition-all duration-300">
                  Today
                </h1>

                <h3 className="ml-1 text-left text-xs font-medium text-slate-500 lg:w-[235px]">
                  {summery.join(">")}
                </h3>
              </div>

              <CountCircle count={tasks.length} />
              <ChevronDown
                className={`ml-1 mt-[15px] flex size-4 align-top transition-all duration-200 ${isOpen && "rotate-180"}`}
              />
            </div>
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <ul className="list-none gap-2">
          {loading
            ? emptyArray.map((task, index) => {
                return <SkeletonWeeklyTaskList id={index} key={index} />;
              })
            : tasks.map((task) => <OnetimeTask task={task} id={task.id} />)}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
