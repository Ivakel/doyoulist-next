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
} from "./ui/select";

type Props = {
  setTaskMode: Dispatch<SetStateAction<string>>;
};
export default function SelectTaskMode({ setTaskMode }: Props) {
  return (
    <Select onValueChange={(value) => setTaskMode(value)}>
      <SelectTrigger className="w-[85px] h-[30px] focus-visible:ring-0 px-2">
        <SelectValue placeholder="Daily" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Daily</SelectLabel>
          <SelectItem value="Daily">Daily</SelectItem>
          <SelectItem value="Weekly">Weekly</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
