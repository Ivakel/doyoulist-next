"use client"
import { useState } from "react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible"
import DateBox from "./dateBox"
import CountCircle from "./ui/countCircle"
import TaskListItem from "./TodayTaskListItem"
import { TodayTaskItem } from "@/lib/types"
import { axiosInstance } from "@/lib/axios"
import SkeletonWeeklyTaskList from "./skeletonWeeklyTaskList"
import { ChevronDown } from "lucide-react"
import { Session } from "next-auth"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import { makeBreadcrumbs } from "@/lib/utils"

type Props = { session: Session }
export default function DailyTasksList({ session }: Readonly<Props>) {
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()

    const fetchDailyTasks = async () => {
        const { data } = await axiosInstance.get<{ tasks: TodayTaskItem[] }>(
            `/api/tasks/daily/${session.user?.email}`,
        )
        return data.tasks
    }
    const {
        data: tasks,
        error,
        isLoading,
    } = useQuery<TodayTaskItem[]>({
        queryKey: ["dailyTasks01"],
        queryFn: fetchDailyTasks,
    })

    if (error) {
        toast({
            variant: "destructive",
            title: "Error fetching daily tasks",
            description: "Something went wrong",
            action: <ToastAction altText="Try again">Close</ToastAction>,
        })
    }
    const emptyArray = [1, 2, 3]

    const summery = ["laundry", "homework", "pancakes", "shopping"]
    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2"
        >
            <CollapsibleTrigger asChild>
                <button className="md z-10 flex items-center rounded-md p-2 transition-colors duration-300 hover:bg-[#f7f7f7] dark:hover:bg-[#303177] lg:w-[305px]">
                    <DateBox />
                    <div>
                        <div className="flex list-none">
                            <div className="p-1 md:w-[230px]">
                                <h1 className="text-left font-semibold transition-all duration-300">
                                    Today tasks
                                </h1>

                                <h3 className="ml-1 text-left text-xs font-medium text-slate-500 lg:w-[235px]">
                                    {makeBreadcrumbs(
                                        tasks?.map((task, index) => {
                                            return task.name
                                        }),
                                    )}
                                </h3>
                            </div>
                            <CountCircle count={tasks ? tasks.length : 0} />
                            <ChevronDown
                                className={`ml-1 mt-[15px] flex size-4 align-top transition-all duration-200 ${isOpen && "rotate-180"}`}
                            />
                        </div>
                    </div>
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
                <ul className="list-none gap-2">
                    {isLoading ? (
                        emptyArray.map((_, index) => {
                            return (
                                <SkeletonWeeklyTaskList
                                    id={index}
                                    key={"skeleton"}
                                />
                            )
                        })
                    ) : tasks ? (
                        tasks.map((task: TodayTaskItem, index: number) => (
                            <TaskListItem
                                key={"TaskListItem"}
                                id={index}
                                task={task}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}
