import { getWeeklyTaskList, updateWeeklyTaskList } from "@/db/db";
import { NextResponse } from "next/server";

type Params = {
  taskId: string;
};

export async function POST(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const tasks = await getWeeklyTaskList();
    console.log(params.taskId)
    const updatedTasks = tasks.map((task, index) => {
      if (task.id === params.taskId) {
        console.log({ ...task, complete: !task.complete })
        return { ...task, complete: !task.complete };
      } else {
        return task;
      }
    });
    updateWeeklyTaskList(updatedTasks);
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error });
  }
}