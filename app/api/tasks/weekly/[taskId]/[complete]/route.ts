import { updateWeeklyTask } from "@/db/db";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { taskId: string; complete: boolean } }
) {
  try {
    const { data, error } = await updateWeeklyTask(
      params.taskId,
      params.complete
    );
    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
