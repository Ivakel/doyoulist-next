import { getTaskList } from "@/db/db";
import { NextResponse } from "next/server";

type Params = {
  taskId: string;
};

export async function POST(
  request: Request,
  { params }: { params: { tasksId: string } }
) {
  try {
    const tasks = await getTaskList();
    const updatedTasks = tasks.map((task, index) => {
      if (task.id === params.tasksId) {
        return { ...task, complete: true };
      } else {
        return task;
      }
    });

    //TODO
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
