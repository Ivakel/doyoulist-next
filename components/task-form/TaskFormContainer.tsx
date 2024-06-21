"use client";

import { useState } from "react";

import SelectTaskMode from "../selectTaskMode";
import DailyForm from "./dailyForm";
import WeeklyForm from "./weeklyForm";

export default function TaskFormContainer() {
  const [taskMode, setTaskMode] = useState<string>("Daily");
  const [taskName, setTaskName] = useState<string>("New Task");

  return (
    <aside className="mt-12 h-min p-4 md:w-[420px] border-[1px] border-slate-700 rounded-sm">
      <div className="mb-3 flex items-center gap-2 align-middle">
        <h1 className="text-xl">{taskName}</h1>
        <SelectTaskMode setTaskMode={setTaskMode} />
      </div>

      {taskMode === "Daily" ? <DailyForm /> : <WeeklyForm />}
    </aside>
  );
}
