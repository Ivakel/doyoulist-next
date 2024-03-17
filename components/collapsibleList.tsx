"use client";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import TaskListItem from "./taskListItem";

type Props = {
  content: ReactNode;
};

export default function CollapsibleList({ content }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState<true | false>(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[100%] transition-all duration-300"
    >
      <div
        className={`flex items-center justify-between p-[1px] border-[1px]${
          isOpen && " border-[#00C898] rounded-md"
        }`}
      >
        <CollapsibleTrigger asChild>{content}</CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <TaskListItem />
        <h3>jdivniudvnefiuv</h3>
      </CollapsibleContent>
    </Collapsible>
  );
}
