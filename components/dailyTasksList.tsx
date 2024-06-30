"use client";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import DateBox from "./dateBox";
import CountCircle from "./ui/countCircle";
import TaskListItem from "./TodayTaskListItem";
import { TodayTaskItem } from "@/lib/types";
import { axiosInstance } from "@/lib/axios";
import SkeletonWeeklyTaskList from "./skeletonWeeklyTaskList";
import { ChevronDown } from "lucide-react";
import { Session } from "next-auth";

export default function DailyTasksList({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<TodayTaskItem[]>([]);
  const emptyArray = [1, 2, 3];

  useEffect(() => {
    fetchTodos(); // Fetch todos when component mounts or when triggerRefetch changes
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/tasks/daily?user=${session.user?.email}`,
      );

      setTasks((prevTasks) => {
        if (!data.tasks) return prevTasks;
        return data.tasks as TodayTaskItem[];
      });
      setLoading((prev) => false);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const summery = ["laundry", "homework", "pancakes", "shopping"];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger asChild>
        <button className="md z-10 flex items-center rounded-md p-2 transition-colors duration-300 hover:bg-[#f7f7f7] dark:hover:bg-[#303177] lg:w-[305px]">
          <DateBox />
          <div>
            <div className="flex list-none">
              <div className="p-1 md:w-[230px]">
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
            ? emptyArray.map((_, index) => {
                return <SkeletonWeeklyTaskList id={index} key={index} />;
              })
            : tasks.map((task, index) => (
                <TaskListItem id={index} task={task} />
              ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
