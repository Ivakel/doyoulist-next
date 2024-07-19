"use client";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import DateBox from "./dateBox";
import CountCircle from "./ui/countCircle";
import { OneTimeTaskType } from "@/lib/types";

import { axiosInstance } from "@/lib/axios";

import SkeletonWeeklyTaskList from "./skeletonWeeklyTaskList";
import { ChevronDown } from "lucide-react";
import { type Session } from "next-auth";
import OnetimeTask from "./onetimeTask";
import { useQuery } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

type Props = {
  session: Session;
};

export default function OnetimeTasksList({ session }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);

  const emptyArray = [1, 2, 3];
  const fetchOnetimeTasks = async () => {
    const { data } = await axiosInstance.get<{ tasks: OneTimeTaskType[] }>(
      `/api/tasks/onetime?user=${session.user?.email}`,
    );
    return data.tasks;
  };

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery<OneTimeTaskType[]>({
    queryKey: ["onetimeTasks"],
    queryFn: fetchOnetimeTasks,
  });
  if (error) {
    toast({
      variant: "destructive",
      title: "Error fetching daily tasks",
      description: "Something went wrong",
      action: <ToastAction altText="Try again">Close</ToastAction>,
    });
  }
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

              <CountCircle count={tasks ? tasks.length : 0} />
              <ChevronDown
                className={`ml-1 mt-[15px] flex size-4 align-top transition-all duration-200 ${isOpen && "rotate-180"}`}
              />
            </div>
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <ul className="list-none gap-2">
          {isLoading ? (
            emptyArray.map((task, index) => {
              return <SkeletonWeeklyTaskList id={index} key={index} />;
            })
          ) : tasks ? (
            tasks.map((task) => <OnetimeTask task={task} id={task.id} />)
          ) : (
            <></>
          )}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
