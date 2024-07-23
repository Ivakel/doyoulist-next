import { OneTimeTaskType } from "@/lib/types";
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
  if (session.user.email !== validatData.user) {
    return NextResponse.json(
      { message: "User not identified" },
      { status: 400 },
    );
  }

  try {
    validatData.dueDate.setHours(+validatData.hours);
    validatData.dueDate.setMinutes(+validatData.minutes);

    const formatedData: Omit<OneTimeTaskType, "id"> = {
      name: validatData.name,
      description: validatData.description,
      priority: validatData.priority as "low" | "medium" | "high",
      dueDate: validatData.dueDate,
      instructions: [],
      completed: false,
    };
    // await chatGPT();

    const userId = await getUserIdByEmail(session?.user?.email);
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const mongoDBUser = await getUserById(userId);

    const onetimeTaskList = await getOnetimeTasksList(
      mongoDBUser.onetimeTasksListId,
    );

    const onetimeTask = await createOnetimeTask(formatedData);

    onetimeTaskList.taskIds.push(onetimeTask._id);
    await onetimeTaskList.save();

    revalidatePath("/home");
    return NextResponse.json(
      { message: "Task successfully created", revalidatePath: "/home" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}
