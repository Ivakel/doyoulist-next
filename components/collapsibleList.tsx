"use client";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  content: ReactNode;
};

export default function CollapsibleList({ content }: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState<true | false>(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[100%]">
      <div
        className={`flex items-center justify-between${
          isOpen && " border-[1px] border-[#00C898] rounded-md"
        }`}
      >
        <CollapsibleTrigger asChild>{content}</CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
