"use client";

import { useState } from "react";

import SelectTaskMode from "../selectTaskMode";
import DailyForm from "./dailyForm";
import WeeklyForm from "./weeklyForm";

export default function TaskFormContainer() {
  const [taskMode, setTaskMode] = useState<string>("Daily");
  const [taskName, setTaskName] = useState<string>("New Task");

  return (
    <aside className="bg-white h-min p-4 mt-12">
      <div className="flex align-middle items-center gap-2 mb-3">
        <h1 className="text-xl">{taskName}</h1>
        <SelectTaskMode setTaskMode={setTaskMode} />
      </div>
      
      {taskMode === "Daily"? <DailyForm />: <WeeklyForm />}
      
    </aside>
  );
}
