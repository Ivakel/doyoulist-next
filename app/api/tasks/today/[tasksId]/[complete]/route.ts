import { updateTodayTask } from "@/db/db";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { tasksId: string; complete: boolean } }
) {
  try {
    const { data, error } = await updateTodayTask(
      params.tasksId,
      params.complete
    );
    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
