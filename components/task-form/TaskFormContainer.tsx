"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import SelectTaskMode from "../selectTaskMode";
import SelectDays from "./selectDays";
import SelectTime from "./selectTime";
import SelectPriority from "./selectPriority";
import ChooseTime from "./chooseTime";
import { Textarea } from "../ui/textarea";
import DailyForm from "./dailyForm";
import WeeklyForm from "./weeklyForm";

export default function TaskFormContainer() {
  const [taskMode, setTaskMode] = useState<string>("Daily");
  const [taskName, setTaskName] = useState<string>("New Task");

  return (
    <aside className="bg-white h-auto p-4">
      <div className="flex align-middle items-center gap-2 mb-3">
        <h1 className="text-xl">{taskName}</h1>
        <SelectTaskMode setTaskMode={setTaskMode} />
      </div>
      
      {taskMode === "Daily"? <DailyForm />: <WeeklyForm />}
      
    </aside>
  );
}
