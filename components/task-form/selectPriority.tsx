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
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { DailyFormProps } from "@/lib/types";



type Props = DailyFormProps & {
};
export default function SelectPriority({ form }: Props) {
  return (
    <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
              <FormControl className="bg-[#F8FAFC]">
                <Select value={field.value}>
          <SelectTrigger className="w-[100px] h-[30px] focus-visible:ring-0 p-1 focus:border-transparent focus:ring-0 px-2">
            <SelectValue placeholder="Priority" className="w-[90px]"/>
          </SelectTrigger>
          <SelectContent className="w-[90px]">
            <SelectGroup className="">
              <SelectLabel className="">Priority</SelectLabel>
              <SelectItem value="low" className="">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
        
      )}
  />
  );
}