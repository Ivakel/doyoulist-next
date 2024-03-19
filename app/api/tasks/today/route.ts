import { getTaskList } from "@/db/db";
import { NextResponse } from "next/server";

export default async function GET(request: Request) {
  try {
    const tasks = await getTaskList();
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
