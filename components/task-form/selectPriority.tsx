"use client";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
    setPriority: Dispatch<SetStateAction<string>>;
};
export default function SelectPriority({ setPriority }: Props) {
  return (
    <Select onValueChange={(value) => setPriority(value)}>
      <SelectTrigger className="w-[90px] h-[30px] focus-visible:ring-0 px-2">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup >
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}