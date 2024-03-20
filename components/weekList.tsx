"use client";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import DateBox from "./dateBox";

export default function WeekList() {
  const [isOpen, setIsOpen] = useState(false);
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
              dueDate={task.dueDate}
              complete={task.complete}
            />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
