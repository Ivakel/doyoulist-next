import { options } from "@/app/api/auth/[...nextauth]/options"
import { getDailyTasksList } from "@/db/db"
import DailyTask, {
    DailyTaskMongoType,
} from "@/db/mongodb/models/DailyTaskModel"
import redis from "@/db/redis/client"
import { RedisUser, TodayTaskItem } from "@/lib/types"
import { Types } from "mongoose"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"

const RequestDataShema = z.object({
    user: z.string().email(),
})
export async function GET(
    request: Request,
    { params }: { params: { user: string } },
) {
    const validatData = RequestDataShema.parse(params)
    const session = await getServerSession(options)
    if (!session) {
        return NextResponse.json(
            { message: "Session unidentified" },
            { status: 400 },
        )
    }

    if (!session.user?.email) {
        return NextResponse.json(
            { message: "User email from session not found" },
            { status: 400 },
        )
    }

    try {
        const userId = await redis.get<string>(`user:email:${validatData.user}`)
        const userRedis = await redis.get<RedisUser>(`user:${userId}`)
        if (!userRedis) {
            throw new Error("Redis: User not found")
        }
        const id = new Types.ObjectId(userRedis.dailyTasksListId)

        const dailyTasksList = await getDailyTasksList(id)

        let tasks: TodayTaskItem[] = []

        const taskIds = dailyTasksList.taskIds

        for (const id of taskIds) {
            const task: DailyTaskMongoType | null = await DailyTask.findById(id)
            if (task) {
                tasks.push({
                    id: task._id.toString() as string,
                    instructions: task.instructions,
                    name: task.name,
                    description: task.description,
                    priority: task.priority as "low" | "medium" | "high",
                    completed: task.completed,
                    days: task.days,
                    dueTime: task.dueTime,
                })
            }
        }
        return NextResponse.json({ tasks }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error })
    }
}
