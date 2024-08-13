"use client"

import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import InstructionListItem from "./instructionListItem"
import { useAddTask } from "@/context/AddTaskContext"

export default function TaskInstructions() {
    const { taskDisplay } = useTaskDisplay()
    const { addTask } = useAddTask()

    return (
        <section
            className={`${addTask || taskDisplay ? "hidden" : ""} flex flex-col pt-14`}
        >
            <h2 className="text-center text-2xl font-medium">
                {taskDisplay?.name}
            </h2>
            <ul className="mt-6 w-[600px] items-start space-y-6 pt-8">
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
