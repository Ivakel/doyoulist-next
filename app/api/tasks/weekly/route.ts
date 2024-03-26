import { getWeeklyTaskList } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const tasks = await getWeeklyTaskList();
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}