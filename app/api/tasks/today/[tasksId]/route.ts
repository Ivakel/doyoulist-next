import { getTodayTaskList, updateTodayTaskList } from "@/db/db";
import { NextResponse } from "next/server";

type Params = {
  taskId: string;
};

export async function POST(
  request: Request,
  { params }: { params: { tasksId: string } }
) {
  try {
    console.log(params)
    const {data, error} = await getTodayTaskList();
    const updatedTasks = data?.map((task, index) => {
      if (task.id === params.tasksId) {
        return { ...task, complete: !task.complete };
      } else {
        return task;
      }
    });

    updateTodayTaskList(updatedTasks);
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
