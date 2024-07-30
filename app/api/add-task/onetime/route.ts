import { OneTimeTaskType, RedisUser } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { options } from "../../auth/[...nextauth]/options";
import {
  createOnetimeTask,
  getOnetimeTasksList,
  getUserById,
  getUserIdByEmail,
} from "@/db/db";
import { revalidatePath } from "next/cache";
import chatGPT from "@/chatGPT/client";
import redis from "@/db/redis/client";
import { Types } from "mongoose";
import { getInstructions } from "@/lib/utils";

const RequestDataShema = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.string(),
  dueDate: z.date(),
  hours: z.string(),
  minutes: z.string(),
  user: z.string().email(),
});
export async function POST(request: Request) {
  const data: Omit<OneTimeTaskType, "instructions"> & { user: string } =
    await request.json();
    console.log(data)
  const validatData = RequestDataShema.parse({...data, dueDate: new Date(data.dueDate)});
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      { message: "Session unidentified" },
      { status: 400 },
    );
  }
  if (!session.user?.email) {
    return NextResponse.json(
      { message: "User email from session not found" },
      { status: 400 },
    );
  }
  if (session.user.email !== validatData.user) {
    return NextResponse.json(
      { message: "User not identified" },
      { status: 400 },
    );
  }

  try {
    validatData.dueDate.setHours(+validatData.hours);
    validatData.dueDate.setMinutes(+validatData.minutes);

    const instructions = await getInstructions({name: validatData.name, description: validatData.description})
    const formatedData: Omit<OneTimeTaskType, "id"> = {
      name: validatData.name,
      description: validatData.description,
      priority: validatData.priority as "low" | "medium" | "high",
      dueDate: validatData.dueDate,
      instructions: instructions,
      completed: false,
    };

    const userId = await redis.get<string>(`user:email:${validatData.user}`);
    const userRedis = await redis.get<RedisUser>(`user:${userId}`)
    if (!userRedis) {
      throw new Error("Redis: User not found")
    }
    const id = new Types.ObjectId(userRedis.onetimeTasksListId)


    const onetimeTaskList = await getOnetimeTasksList(
      id,
    );

    const onetimeTask = await createOnetimeTask(formatedData);

    onetimeTaskList.taskIds.push(onetimeTask._id);

    await onetimeTaskList.save();

    revalidatePath("/api/tasks/onetime/:path*");
    return NextResponse.json(
      { message: "Task successfully created", revalidatePath: "/home" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}
