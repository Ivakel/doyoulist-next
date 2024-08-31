"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Dispatch, SetStateAction, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import SelectTime from "./selectTime"
import SelectPriority from "./selectPriority"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { LoaderIcon } from "lucide-react"
import { axiosInstance } from "@/lib/axios"
import { ToastAction } from "../ui/toast"
import { useSession } from "next-auth/react"
import { useToast } from "../ui/use-toast"
import { getCurrentTime } from "@/lib/utils"
import { Calendar } from "../ui/calendar"
import { useAddTask } from "@/context/AddTaskContext"
import { useMainDisplay } from "@/hooks/useMainDisplay"
import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import { DisplayType } from "@/context/MainDisplayContext"
import { TaskDisplayType } from "@/context/taskDisplayContext"
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
} from "../ui/alert-dialog"

type Props = {}

export default function OnetimeTaskForm({}: Props) {
    const { data: session, status } = useSession()
    const { toast } = useToast()
    const { hour, minute } = getCurrentTime()
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
    const [hours, setHours] = useState<string>(hour.toString())
    const [minutes, setMinutes] = useState<string>(minute.toString())
    const [isLoading, SetIsLoading] = useState(false)
    const [dueDate, setDueDate] = useState<Date | undefined>(new Date())
    const { setToDisplay } = useMainDisplay()
    const { taskDisplay } = useTaskDisplay()
    const { setAddTask } = useAddTask()

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

    const resetForm = () => {
        form.reset()
        setDueDate((prev) => new Date())
        setPriority("low")
    }

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
        SetIsLoading(true)
        const data = await axiosInstance.post("/api/add-task/onetime", {
            ...values,
            priority,
            dueDate,
            hours,
            minutes,
            user: session.user?.email,
        })
        SetIsLoading(false)
    }
    return (
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
                            currentHour={
                                hour >= 10
                                    ? hour.toString()
                                    : `0${hour.toString()}`
                            }
                            setMinutes={setMinutes}
                            currentMinute={
                                minute >= 10
                                    ? minute.toString()
                                    : `0${minute.toString()}`
                            }
                        />
                    </div>
                    <div className="mx-auto">
                        <Calendar
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                        />
                    </div>
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
                            setToDisplay(() => {
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
