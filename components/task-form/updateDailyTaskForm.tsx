import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { Form, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { ToastAction } from "../ui/toast"
import { useToast } from "../ui/use-toast"
import { Dispatch, SetStateAction, useState } from "react"
import { axiosInstance } from "@/lib/axios"
import SelectDays from "./selectDays"
import SelectPriority from "./selectPriority"
import SelectTime from "./selectTime"
import { Button } from "../ui/button"
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
import { useAddTask } from "@/context/AddTaskContext"
import { useSession } from "next-auth/react"
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useMainDisplay } from "@/hooks/useMainDisplay"
import { useEditDailyTaskData } from "@/hooks/useEditDailyTaskData"
import { DisplayType } from "@/context/MainDisplayContext"
import { useTaskDisplay } from "@/hooks/useTaskDisplay"
import { TaskDisplayType } from "@/context/taskDisplayContext"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { TodayTaskItem } from "@/lib/types"
import { Textarea } from "../ui/textarea"

type Props = {
    task: TodayTaskItem
}

export const UpdateDailyTaskForm = ({ task }: Props) => {
    const { data: session, status } = useSession()
    const taskData = task
    const dueTime = new Date(taskData ? taskData.dueTime : "")
    const method = useForm()

    const { toast } = useToast()
    const { hour, minute } = {
        hour: dueTime.getHours(),
        minute: dueTime.getMinutes(),
    }

    const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
    const [days, setDays] = useState<string[]>(taskData?.days || [])
    const [hours, setHours] = useState<string>(hour.toString())
    const [minutes, setMinutes] = useState<string>(minute.toString())
    const [isLoading, SetIsLoading] = useState(false)
    const { setToDisplay, toDisplay } = useMainDisplay()
    const { taskDisplay } = useTaskDisplay()

    const resetForm = () => {
        form.reset()
        setDays((prev) => [])
        setPriority("low")
    }

    const formSchema = z.object({
        name: z.string().min(1, { message: "Fill in the task name." }),
        description: z.string(),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: taskData ? taskData.name : "",
            description: taskData ? taskData.description : "",
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
        const data = await axiosInstance.post("/api/update-task/daily", {
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex h-8 w-[120px] items-center space-x-6 rounded-sm hover:bg-white">
                        Edit Task
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <FormProvider {...method}>
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
                                                placeholder="Type your description here."
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
                        </form>
                    </Form>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </FormProvider>
            </DialogContent>
        </Dialog>
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
