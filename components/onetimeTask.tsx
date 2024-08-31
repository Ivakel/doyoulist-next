"use client"
import Image from "next/image"
import { Checkbox } from "./ui/checkbox"
import { OneTimeTaskType } from "@/lib/types"
import { Clock, Edit } from "lucide-react"
import EllipsisVertical from "@/public/svg/EllipsisVertical.svg"
import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { axiosInstance } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { Button } from "./ui/button"
import { useMainDisplay } from "@/hooks/useMainDisplay"
import { useEditOnetimeData } from "@/state"
import { useState } from "react"

type Props = {
    id: string
    task: OneTimeTaskType
}

export default function OnetimeTask({ id, task }: Props) {
    const [isloading, setIsloading] = useState<boolean>(false)
    const { taskDisplay, setTaskDisplay } = useTaskDisplay()
    const { setToDisplay } = useMainDisplay()
    const { setTaskdata } = useEditOnetimeData()
    const { data } = useSession()
    const handleClicked = async () => {
        setTaskDisplay({
            name: task.name,
            instructions: task.instructions,
            id: task.id,
        })
    }
    const date = new Date(task.dueDate)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const handleDelete = async (taskId: string) => {
        if (taskDisplay?.id === taskId) {
            setTaskDisplay(null)
        }

        try {
            setIsloading(true)
            await axiosInstance.delete(
                `/api/tasks/onetime/delete/${data?.user?.email}/${taskId}`,
            )
            revalidatePath("/api/tasks/daily/:path*")
            setIsloading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <li className="group" key={id}>
            <button
                className="group flex items-center justify-between rounded-md px-4 align-middle hover:cursor-pointer hover:bg-[#f1f1f1] lg:w-[305px]"
                key={id}
                onClick={() => {
                    handleClicked()
                }}
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
                <div className="z-50 flex justify-center">
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
                                onClick={() => {
                                    setTaskdata(task)
                                    setToDisplay(
                                        (prev) => "EDIT_ONETIME_TASK_FORM",
                                    )
                                }}
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
                                    handleDelete(task.id)
                                }}
                                variant={"secondary"}
                                size={"tiny"}
                                disabled={isloading}
                                className="flex h-8 w-[120px] items-center space-x-6 rounded-sm hover:bg-white"
                            >
                                <h3 className="w-[120px] text-xs">Delete</h3>
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </button>
        </li>
    )
}
