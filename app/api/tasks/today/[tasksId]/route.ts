import { getTodayTask, getTodayTaskList } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { tasksId: string } }
) {
  try {
    console.log(params);
    const { data, error } = await getTodayTaskList();

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { tasksId: string } }
) {
  try {
    const { data, error } = await getTodayTask(params.tasksId);
    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
