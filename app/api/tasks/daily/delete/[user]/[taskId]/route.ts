import { getDailyTasksList } from "@/db/db"
import DailyTask from "@/db/mongodb/models/DailyTaskModel"
import redis from "@/db/redis/client"
import { RedisUser } from "@/lib/types"
import { Types } from "mongoose"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { z } from "zod"

const RequestDataShema = z.object({
    user: z.string().email(),
    taskId: z.string(),
})
export async function DELETE(
    request: Request,
    { params }: { params: { taskId: string; user: string } },
) {
    const validatData = RequestDataShema.parse(params)
    const taskIdObj = new Types.ObjectId(validatData.taskId)
    try {
        //await DailyTask.findByIdAndDelete(taskIdObj)
        const userId = await redis.get<string>(`user:email:${validatData.user}`)
        const userRedis = await redis.get<RedisUser>(`user:${userId}`)
        if (!userRedis) {
            throw new Error("Redis: User not found")
        }
        const id = new Types.ObjectId(userRedis.dailyTasksListId)

        const dailyTasksList = await getDailyTasksList(id)

        dailyTasksList.taskIds = dailyTasksList.taskIds.filter((value) => {
            return value._id.toString() !== validatData.taskId
        })
        await dailyTasksList.save()
        revalidatePath("/api/tasks/daily/:path*")
        return NextResponse.json({ status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 200 })
    }
}
