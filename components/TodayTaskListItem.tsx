import { Checkbox } from "./ui/checkbox"
import { TodayTaskItem } from "@/lib/types"
import { Clock } from "lucide-react"
import LowPriorityCircle from "@/public/svg/low-priority-circle.svg"
import MediumPriorityCircle from "@/public/svg/medium-priority-circle.svg"
import HighPriorityCircle from "@/public/svg/high-priority-circle.svg"
import Image from "next/image"
import { useTaskDisplay } from "@/hooks/useTaskDisplay"
type Props = {
    task: TodayTaskItem
    id: number
}

const PriorityColors = {
    low: LowPriorityCircle,
    medium: MediumPriorityCircle,
    high: HighPriorityCircle,
}

export default function TodayTaskListItem({ task, id }: Readonly<Props>) {
    const {taskDisplay, setTaskDisplay} = useTaskDisplay()
    const handleClicked = () => {
        console.log("clicked")
        setTaskDisplay({
            name: task.name,
            instructions: task.instructions
        })
    }
    const date = new Date(task.dueTime)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return (
        <button
            className="group flex items-center justify-between rounded-md px-4 align-middle hover:cursor-pointer hover:bg-[#f1f1f1] lg:w-[305px]"
            key={id}
            onClick={() => handleClicked()}
        >
            <div className="flex items-center space-x-2">
                <Checkbox
                    className="size-4 rounded-full data-[state=checked]:bg-[#575293]"
                    id={`${id}`}
                    checked={task.completed}
                    onClick={() => {
                        handleClicked()
                    }}
                />
                <div className="flex flex-col gap-0">
                    <h3 className="text-sm font-medium">{task.name}</h3>
                    <div className="flex items-center gap-1 align-middle">
                        <Clock className="size-3" />
                        <h3 className="text-xs">{`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`}</h3>
                        <div className={`size-3`}></div>
                    </div>
                </div>
            </div>
            <Image src={PriorityColors[task.priority]} width={20} height={20} className="size-2 opacity-60 bg-[#${priorityColor}] group-hover:opacity-100" alt="A circle that indicates the priority of the task"/>
        </button>
    )
}
