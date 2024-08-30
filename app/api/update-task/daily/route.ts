import { DailyFormTypes, DailyTaskDBType } from "@/lib/types"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { options } from "../../auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import { getInstructions } from "@/lib/utils"
import { addTaskRatelimiter } from "@/db/redis/client"
import DailyTask from "@/db/mongodb/models/DailyTaskModel"

const RequestDataShema = z.object({
    id: z.string(),
    name: z.string(),
    nameChanged: z.boolean(),
    description: z.string(),
    descriptionChanged: z.boolean(),
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
        const { success } = await addTaskRatelimiter.limit(ip || "")
        if (!success) {
            return NextResponse.json(
                { message: "Too many requests" },
                { status: 429 },
            )
        }
        const data = await request.json()
        const validatData = RequestDataShema.parse(data)

        const date = new Date()
        date.setHours(+validatData.hours)
        date.setMinutes(+validatData.minutes)
        const instructions =
            validatData.descriptionChanged || validatData.nameChanged
                ? await getInstructions({
                      name: validatData.name,
                      description: validatData.description,
                  })
                : null

        const task = await DailyTask.findById(validatData.id)

        if (!task) {
            return NextResponse.json(
                { message: "Task not found", revalidatePath: "/home" },
                { status: 500 },
            )
        }

        task.name = validatData.name
        task.days = validatData.days
        task.description = validatData.description
        if (instructions) {
            task.instructions = instructions
        }
        task.dueTime = date
        task.priority = validatData.priority
        await task.save()

        revalidatePath("/api/tasks/daily/:path*")
        return NextResponse.json(
            { message: "Task successfully created", revalidatePath: "/home" },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json({ error })
    }
}
