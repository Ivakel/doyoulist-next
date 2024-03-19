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
import TaskListItem from "./taskListItem";
import { TaskItem } from "@/lib/types";
import { getTaskList } from "../db/db";

export default function CollapsibleList() {
  const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false);

  useEffect(() => {
    fetchTodos(); // Fetch todos when component mounts or when triggerRefetch changes
  }, [triggerRefetch]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks/today"); // Replace with your actual API endpoint
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleTodoAction = () => {
    // Perform the action that should trigger a refetch
    // For example, adding a new todo
    // After the action is completed, set triggerRefetch to true
    // This will trigger useEffect to refetch todos
    setTriggerRefetch(true);
  };

  const summery = ["laundry", "homework", "pancakes", "shopping"];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <CollapsibleTrigger asChild>
        <button className="flex hover:bg-[#eeeded] rounded-md p-2 transition-colors duration-300 z-10">
          <DateBox />
          <div>
            <div className="list-none flex">
              <div className="p-1">
                <h1 className="font-semibold text-left transition-all duration-300">
                  Today
                </h1>

                <h3 className="font-medium text-xs text-slate-500 ml-1 text-left">
                  {summery.join(">")}
                </h3>
              </div>
              <CountCircle count={5} />
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
      <CollapsibleContent className="space-y-2 p-4">
        <ul className="list-none ">
          {tasks.map((task) => (
            <TaskListItem
              id={task.id}
              taskName={task.taskName}
              dueDate={task.dueDate}
              complete={task.complete}
            />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

type TodayComponentProps = {
  isOpen: boolean;
};
function TodayComponent({ isOpen }: TodayComponentProps) {
  const summery = ["laundry", "homework", "pancakes", "shopping"];
  return (
    <div className="flex hover:bg-[#eeeded] rounded-md p-2 transition-colors duration-300">
      <DateBox />
      <div>
        <div className="list-none flex">
          <div className="p-1">
            <h1 className="font-semibold text-left transition-all duration-300">
              Today
            </h1>

            <h3 className="font-medium text-xs text-slate-500 ml-1 text-left">
              {summery.join(">")}
            </h3>
          </div>
          <CountCircle count={5} />
          <div className="mt-[15px] ml-5">
            <Image
              src={DropDownArrow}
              alt="dropdown arrow"
              width={20}
              height={20}
              className={
                isOpen
                  ? "rotate-180 transition-all duration-300"
                  : "transition-all duration-300"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
