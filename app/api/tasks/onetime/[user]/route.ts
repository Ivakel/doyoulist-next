import { options } from "@/app/api/auth/[...nextauth]/options";
import { getOnetimeTasksList, getUserById, getUserIdByEmail } from "@/db/db";
import OnetimeTaskModel, {
  OnetimeDBType,
} from "@/db/mongodb/models/OnetimeTaskModel";
import { OneTimeTaskType } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestDataShema = z.object({
  user: z.string().email(),
});
export async function GET(request: Request) {
  const data: { user: string } = await request.json();
  const validatData = RequestDataShema.parse(data);
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

    const onetimeTasksList = await getOnetimeTasksList(
      mongoDBUser.onetimeTasksListId,
    );

    let tasks: OneTimeTaskType[] = [];

    const taskIds = onetimeTasksList.taskIds;

    for (const id of taskIds) {
      const task: OnetimeDBType | null = await OnetimeTaskModel.findById(id);
      if (task) {
        tasks.push({
          id: task._id.toString() as string,
          name: task.name,
          description: task.description,
          instructions: task.instructions,
          priority: task.priority,
          completed: task.completed,
          dueDate: task.dueDate,
        });
      }
    }

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
