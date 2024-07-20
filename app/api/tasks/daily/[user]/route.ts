import { options } from "@/app/api/auth/[...nextauth]/options";
import { getDailyTasksList, getUserById, getUserIdByEmail } from "@/db/db";
import DailyTask, {
  DailyTaskMongoType,
} from "@/db/mongodb/models/DailyTaskModel";
import { DailyTaskDBType, TodayTaskItem } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestDataShema = z.object({
  user: z.string().email(),
});
export async function GET(
  request: Request,
  { params }: { params: { user: string } },
) {
  const validatData = RequestDataShema.parse(params);
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

  try {
    const userId = await getUserIdByEmail(validatData.user);
    const mongoDBUser = await getUserById(userId);

    const dailyTasksList = await getDailyTasksList(
      mongoDBUser.dailyTasksListId,
    );

    let tasks: TodayTaskItem[] = [];

    const taskIds = dailyTasksList.taskIds;

    for (const id of taskIds) {
      const task: DailyTaskMongoType | null = await DailyTask.findById(id);
      if (task) {
        tasks.push({
          id: task._id.toString() as string,
          name: task.name,
          description: task.description,
          priority: task.priority,
          completed: task.completed,
          days: task.days,
          dueTime: task.dueTime,
        });
      }
    }

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
