import { Checkbox } from "./ui/checkbox"
import { TodayTaskItem } from "@/lib/types"
import { Clock } from "lucide-react"
type Props = {
    task: TodayTaskItem
    id: number
}

const PriorityColors = {
    low: "0FAA3D",
    medium: "F2711C",
    high: "DB2E2E",
}

export default function TodayTaskListItem({ task, id }: Readonly<Props>) {
    const handleClicked = async () => {}
    const priorityColor = PriorityColors[task.priority]
    const date = new Date(task.dueTime)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return (
        <button
            className="group flex items-center justify-between rounded-md px-4 align-middle hover:cursor-pointer hover:bg-[#f1f1f1] lg:w-[305px]"
            key={id}
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
            <div
                className={`size-2 rounded-full opacity-60 bg-[#${priorityColor}] group-hover:opacity-100`}
            ></div>
        </button>
    )
}
