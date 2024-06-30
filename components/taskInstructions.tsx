"use client";

import { useTaskDsplayContext } from "@/context/TaskDisplayContext";
import InstructionListItem from "./instructionListItem";

export default function TaskInstructions() {
  const { taskDisplay, setTaskDisplay } = useTaskDsplayContext();
  return (
    <section className="flex flex-col">
      <h2>{taskDisplay?.taskName}</h2>
      <ul>
        {taskDisplay?.instructions.map((instruction, index) => (
          <InstructionListItem key={index} instruction={instruction} />
        ))}
      </ul>
    </section>
  );
}
