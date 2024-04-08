import { updateTodayTask } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { tasksId: string; complete: boolean } }
) {
  try {
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error });
  }
}
