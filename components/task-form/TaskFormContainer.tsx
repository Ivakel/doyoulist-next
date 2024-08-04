"use client"

import { useState } from "react"

import SelectTaskMode from "../selectTaskMode"
import DailyForm from "./dailyForm"
import OnetimeTaskForm from "./OnetimeTaskForm"
import { useAddTask } from "@/context/AddTaskContext"
import { Button } from "../ui/button"

export default function TaskFormContainer() {
    const [taskMode, setTaskMode] = useState<string>("Daily")
    const [taskName] = useState<string>("New Task")
    const { addTask } = useAddTask()
    return (
        <aside
            className={`${addTask ? "" : "hidden"} absolute z-10 blur-none mt-12 h-min rounded-sm border-[1px] p-4 dark:border-slate-700 md:w-[420px]`}
        >
            <div className="mb-3 flex items-center gap-2 align-middle">
                <h1 className="text-xl">{taskName}</h1>
                <SelectTaskMode setTaskMode={setTaskMode} />
            </div>

            {taskMode === "Daily" ? <DailyForm /> : <OnetimeTaskForm />}
        </aside>
    )
}
