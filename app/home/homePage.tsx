"use client"
import AddButton from "@/components/addButton"
import TaskInstructions from "@/components/taskInstructions"
import { useSession } from "next-auth/react"

import LoaderSpinner from "@/components/ui/loaderSpinner"
import LogOutButton from "@/components/logOutButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TaskFormContainer from "@/components/task-form/TaskFormContainer"
import { Toaster } from "@/components/ui/toaster"
import { Bell, ChevronDown } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"
import OnetimeTasksList from "@/components/onetimeList"
import DailyTasksList from "@/components/dailyTasksList"
import { useAddTask } from "@/context/AddTaskContext"
import { UpdateDailyTaskForm } from "@/components/task-form/updateDailyTaskForm"
import { FormProvider } from "react-hook-form"

export default function HomePage() {
    const { data: session, status } = useSession()
    const { addTask } = useAddTask()
    if (status === "loading") {
        return <LoaderSpinner />
    }
    if (!session) {
        redirect("/login")
    }
    return (
        <section className={`relative flex`}>
            <section className="flex h-[100vh] flex-col sm:w-[350px] md:w-[350px] lg:w-[350px]">
                <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="inline-block size-8 rounded-full">
                            <AvatarImage src={`${session?.user?.image}`} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <h3 className="text-sm font-medium">
                            {session?.user?.name}
                        </h3>

                        <button className="items-center">
                            <ChevronDown />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Bell className="size-4" />
                        <LogOutButton path="/login" />
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-6">
                    <AddButton />
                    <DailyTasksList session={session} />
                    <OnetimeTasksList session={session} />
                </div>
            </section>
            <Separator className="" orientation="vertical" />
            <section className="relative flex h-[100vh] w-[70%] justify-center px-10">
                <TaskFormContainer />
                <div className="absolute left-0 top-0 -z-10 flex h-full w-full justify-center align-middle" />
                <TaskInstructions />
                <UpdateDailyTaskForm />
            </section>
            <Toaster />
            <ModeToggle />
        </section>
    )
}
