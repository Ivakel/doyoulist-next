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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Daily" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Daily</SelectLabel>
          <SelectItem value="Daily">Apple</SelectItem>
          <SelectItem value="Weekly">Banana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
