"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { useEditDailyTaskData } from "@/hooks/useEditDailyTaskData"
import { useMainDisplay } from "@/hooks/useMainDisplay"
import SelectDays from "./selectDays"
import { useState } from "react"
import SelectPriority from "./selectPriority"
import SelectTime from "./selectTime"
import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import { LoaderIcon, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { axiosInstance } from "@/lib/axios"
import { ToastAction } from "../ui/toast"
import { useToast } from "../ui/use-toast"
import { OneTimeTaskType, TodayTaskItem } from "@/lib/types"
import { Calendar } from "../ui/calendar"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Task name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Task description must be at least 2 characters.",
    }),
})

export function UpdateOnetimeTaskForm({
    taskData,
}: {
    taskData: OneTimeTaskType
}) {
    const { data: session, status } = useSession()
    const { toast } = useToast()
    const { toDisplay } = useMainDisplay()
    const [dueDate, setDueDate] = useState<Date | undefined>(
        new Date(taskData.dueDate),
    )
    const [isLoading, SetIsLoading] = useState(false)
    const [priority, setPriority] = useState<"low" | "medium" | "high">(
        taskData.priority,
    )
    const { setToDisplay } = useMainDisplay()
    const { taskDisplay } = useTaskDisplay()
    const [hours, setHours] = useState<string>(`${dueDate?.getHours() || 0}`)
    const [minutes, setMinutes] = useState<string>(
        dueDate ? dueDate.getMinutes().toString() : "00",
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: taskData.name,
            description: taskData.description,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (status !== "authenticated") {
            toast({
                variant: "destructive",
                title: "Task not created",
                description: "Something went wrong",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            })
            return
        }
        // if (dueDate.length < 1) {
        //     toast({
        //         variant: "destructive",
        //         title: "Task form not complete",
        //         description: "No days were selected",
        //         action: (
        //             <ToastAction altText="Try again">Try again</ToastAction>
        //         ),
        //     })
        //     return
        // }
        SetIsLoading(true)
        const data = await axiosInstance.patch("/api/update-task/onetime", {
            ...values,
            nameChanged: taskData.name !== values.name,
            descriptionChanged: taskData.description !== values.description,
            priority,
            dueDate,
            hours,
            minutes,
            user: session.user?.email,
            id: taskData.id,
        })
        SetIsLoading(false)
        console.log(data)
        if (data.status === 200) {
            toast({
                className: "bg-[#5cfd8c]",
                variant: "default",
                title: "Task added",
                description: "Success",
                action: <ToastAction altText="Okay">Okay</ToastAction>,
            })
        }
        if (data.status === 429) {
            toast({
                variant: "destructive",
                title: "Task not added",
                description:
                    "Please wait a minute to continue adding another task",
                action: <ToastAction altText="Okay">Okay</ToastAction>,
            })
        }
    }

    return (
        <section
            className={`absolute z-50 mt-12 h-min rounded-sm border-[1px] p-4 blur-none dark:border-slate-700 md:w-[420px]`}
        >
            <h1 className="mb-3 text-xl">Edit task</h1>
            <X
                className="absolute right-3 top-2 flex size-6 justify-center space-x-2 hover:cursor-pointer"
                type="button"
                onClick={() => {
                    setToDisplay((prev) => {
                        if (taskDisplay) return "TASK_INSTRUCTIONS"
                        return "NULL"
                    })
                }}
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-3 md:w-[390px]"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="">
                                    <Input
                                        placeholder="Task Name"
                                        {...field}
                                        className="focus-visible:ring-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="">
                                    <Textarea
                                        className="focus-visible:ring-0"
                                        {...field}
                                        placeholder="Type your message here."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4 w-[100px] space-x-2">
                        <div className="flex space-x-2 self-center">
                            <SelectPriority setPriority={setPriority} />
                            <SelectTime
                                setHours={setHours}
                                currentHour={+hours >= 10 ? hours : `0${hours}`}
                                setMinutes={setMinutes}
                                currentMinute={
                                    +minutes >= 10 ? minutes : `0${minutes}`
                                }
                            />
                        </div>
                        <div className="mx-auto">
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={setDueDate}
                                defaultMonth={dueDate}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <Button
                            className="flex w-full justify-center space-x-2"
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading && (
                                <LoaderIcon className="spinner size-4" />
                            )}
                            <h3 className={`${isLoading && "text-slate-700"}`}>
                                Edit task
                            </h3>
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}
