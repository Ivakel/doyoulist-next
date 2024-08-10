import { Checkbox } from "./ui/checkbox"
import { TodayTaskItem } from "@/lib/types"
import { Clock, Delete, Edit } from "lucide-react"
import LowPriorityCircle from "@/public/svg/low-priority-circle.svg"
import MediumPriorityCircle from "@/public/svg/medium-priority-circle.svg"
import HighPriorityCircle from "@/public/svg/high-priority-circle.svg"
import EllipsisVertical from "@/public/svg/EllipsisVertical.svg"
import Image from "next/image"
import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { axiosInstance } from "@/lib/axios"
import { useSession } from "next-auth/react"
import { revalidatePath } from "next/cache"
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
    const { data } = useSession()
    const { taskDisplay, setTaskDisplay } = useTaskDisplay()
    const handleClicked = () => {
        setTaskDisplay({
            name: task.name,
            instructions: task.instructions,
            id: task.id,
        })
    }

    const handleDelete = async (taskId: string) => {
        try {
            await axiosInstance.delete(
                `/api/tasks/daily/delete/${data?.user?.email}/${taskId}`,
            )
            revalidatePath("/api/tasks/daily/:path*")
        } catch (error) {
            console.log(error)
        }
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
                    <div className="flex items-center space-x-2 align-middle">
                        <h3 className="text-sm font-medium">{task.name}</h3>
                        <Image
                            src={PriorityColors[task.priority]}
                            width={20}
                            height={20}
                            className="bg-[#${priorityColor}] size-2 opacity-60 group-hover:opacity-100"
                            alt="A circle that indicates the priority of the task"
                        />
                    </div>
                    <div className="flex items-center gap-1 align-middle">
                        <Clock className="size-3" />
                        <h3 className="text-xs">{`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`}</h3>
                        <div className={`size-3`}></div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image
                            src={EllipsisVertical}
                            width={20}
                            height={20}
                            className="bg-[#${priorityColor}] size-4 opacity-60 group-hover:opacity-100"
                            alt="Dropdown trigger"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[80px] items-center space-y-1 p-1">
                        <Button
                            onClick={() => {}}
                            variant={"secondary"}
                            size={"tiny"}
                            className="flex h-8 w-[120px] items-center space-x-6 rounded-sm hover:bg-white"
                        >
                            <span className="flex w-[120px] items-center justify-center space-x-4">
                                <h3 className="text-xs">Edit</h3>
                                <Edit className="size-3" />
                            </span>
                        </Button>
                        <Button
                            onClick={() => {
                                setTaskDisplay((prev) => null)
                                handleDelete(task.id)
                            }}
                            variant={"secondary"}
                            size={"tiny"}
                            className="flex h-8 w-[120px] items-center space-x-6 rounded-sm hover:bg-white"
                        >
                            <h3 className="w-[120px] text-xs">Delete</h3>
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </button>
    )
}
