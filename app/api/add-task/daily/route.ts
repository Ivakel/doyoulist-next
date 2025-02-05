import { DailyFormTypes, DailyTaskDBType } from "@/lib/types"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { options } from "../../auth/[...nextauth]/options"
import requestIp from "request-ip"

import {
    createDailyTask,
    getDailyTasksList,
    getUserById,
    getUserIdByEmail,
} from "@/db/db"
import { revalidatePath } from "next/cache"
import { getInstructions } from "@/lib/utils"
import { NextApiRequest } from "next"
import { addTaskRatelimiter } from "@/db/redis/client"

const RequestDataShema = z.object({
    name: z.string(),
    description: z.string(),
    priority: z.string(),
    days: z.string().array().min(1),
    hours: z.string(),
    minutes: z.string(),
    user: z.string().email(),
})
export async function POST(request: NextRequest) {
    const session = await getServerSession(options)
    if (!session) {
        return NextResponse.json(
            { message: "Session unidentified" },
            { status: 400 },
        )
    }
    if (!session?.user?.email) {
        return NextResponse.json(
            { message: "User email from session not found" },
            { status: 400 },
        )
    }

    try {
        const ip = request.headers.get("x-forwarded-for")
        const { remaining, success, limit } = await addTaskRatelimiter.limit(
            ip || "",
        )
        if (!success) {
            return NextResponse.json(
                { message: "Too many requests" },
                { status: 429 },
            )
        }
        const data: DailyFormTypes = await request.json()
        const validatData = RequestDataShema.parse(data)
        const date = new Date()
        date.setHours(+validatData.hours)
        date.setMinutes(+validatData.minutes)
        const instructions = await getInstructions({
            name: validatData.name,
            description: validatData.description,
        })

        const formatedData: DailyTaskDBType = {
            name: validatData.name,
            priority: validatData.priority,
            instructions: instructions,
            days: validatData.days,
            description: validatData.description,
            dueTime: date,
            completed: false,
        }
        const userId = await getUserIdByEmail(session?.user?.email)
        if (!userId) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 400 },
            )
        }
        const mongoDBUser = await getUserById(userId)

        const dailyTasksList = await getDailyTasksList(
            mongoDBUser.dailyTasksListId,
        )

        const dailyTask = await createDailyTask(formatedData)

        dailyTasksList.taskIds.push(dailyTask._id)
        await dailyTasksList.save()

        revalidatePath("/api/tasks/daily/:path*")
        return NextResponse.json(
            { message: "Task successfully created", revalidatePath: "/home" },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json({ error })
    }
}
