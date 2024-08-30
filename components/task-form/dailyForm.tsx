"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import SelectDays from "./selectDays"
import SelectPriority from "./selectPriority"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { getCurrentTime } from "@/lib/utils"
import SelectTime from "./selectTime"
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { axiosInstance } from "@/lib/axios"
import { useSession } from "next-auth/react"
import { LoaderIcon } from "lucide-react"
import { useAddTask } from "@/context/AddTaskContext"
import { useMainDisplay } from "@/hooks/useMainDisplay"
import { DisplayType } from "@/context/MainDisplayContext"
import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import { TaskDisplayType } from "@/context/taskDisplayContext"

export default function DailyForm() {
    const { data: session, status } = useSession()
    const { toast } = useToast()
    const { hour, minute } = getCurrentTime()
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
    const [days, setDays] = useState<string[]>([])
    const [hours, setHours] = useState<string>(hour.toString())
    const [minutes, setMinutes] = useState<string>(minute.toString())
    const [isLoading, SetIsLoading] = useState(false)
    const { setAddTask } = useAddTask()
    const { setToDisplay } = useMainDisplay()
    const { taskDisplay } = useTaskDisplay()

    const resetForm = () => {
        form.reset()
        setDays((prev) => [])
        setPriority("low")
    }

    const formSchema = z.object({
        name: z.string().min(1, { message: "This field has to be filled." }),
        description: z.string(),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
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
        if (days.length < 1) {
            toast({
                variant: "destructive",
                title: "Task form not complete",
                description: "No days were selected",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            })
            return
        }
        SetIsLoading(true)
        const data = await axiosInstance.post("/api/add-task/daily", {
            ...values,
            priority,
            days,
            hours,
            minutes,
            user: session.user?.email,
        })
        SetIsLoading(false)
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-3 md:w-96"
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
                <div className="mt-4 flex w-[100px] space-x-2">
                    <SelectDays days={days} setDays={setDays} />
                    <SelectPriority setPriority={setPriority} />
                    <SelectTime
                        setHours={setHours}
                        currentHour={
                            hour >= 10 ? hour.toString() : `0${hour.toString()}`
                        }
                        setMinutes={setMinutes}
                        currentMinute={
                            minute >= 10
                                ? minute.toString()
                                : `0${minute.toString()}`
                        }
                    />
                </div>
                <div className="mt-4 flex space-x-2">
                    <AlertDialogCancelForm
                        resetForm={resetForm}
                        setToDisplay={setToDisplay}
                        taskDisplay={taskDisplay}
                    />
                    <Button
                        className="flex w-3/4 justify-center space-x-2"
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading && <LoaderIcon className="spinner size-4" />}
                        <h3 className={`${isLoading && "text-slate-700"}`}>
                            Add task
                        </h3>
                    </Button>
                </div>
            </form>
        </Form>
    )
}

const AlertDialogCancelForm = ({
    resetForm,
    setToDisplay,
    taskDisplay,
}: {
    resetForm: () => void
    setToDisplay: Dispatch<SetStateAction<DisplayType>>
    taskDisplay: TaskDisplayType | null
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="flex w-1/4 justify-center space-x-2"
                    type="button"
                    variant="outline"
                >
                    Cancel
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete all the
                        already filled inputs.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Go back</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            resetForm()
                            setToDisplay((prev) => {
                                console.log(taskDisplay)
                                if (taskDisplay) return "TASK_INSTRUCTIONS"
                                return "NULL"
                            })
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
