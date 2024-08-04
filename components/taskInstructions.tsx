"use client"

import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import InstructionListItem from "./instructionListItem"
import { useAddTask } from "@/context/AddTaskContext"

export default function TaskInstructions() {
    const { taskDisplay } = useTaskDisplay()
    const { addTask } = useAddTask()

    return (
        <section className={`${addTask? "hidden": ""} flex flex-col pt-14`}>
            <h2 className="font-medium text-center text-2xl">{taskDisplay?.name}</h2>
            <ul className="pt-8 space-y-6 items-start w-[600px] mt-6">
                {taskDisplay?.instructions.map((instruction, index) => (
                    <InstructionListItem
                        key={index}
                        instruction={instruction}
                    />
                ))}
            </ul>
        </section>
    )
}
