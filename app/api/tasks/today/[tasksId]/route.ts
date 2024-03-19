import { getTaskList, updateTaskList } from "@/db/db";
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
        return { ...task, complete: !task.complete };
      } else {
        return task;
      }
    });

    updateTaskList(updatedTasks);
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
