import { getTodayTaskList } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const {data, error} = await getTodayTaskList();

    return NextResponse.json({ data, error }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
