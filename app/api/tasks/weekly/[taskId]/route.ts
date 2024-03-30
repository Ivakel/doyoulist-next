import { getWeeklyTaskList } from "@/db/db";
import { NextResponse } from "next/server";

type Params = {
  taskId: string;
};
