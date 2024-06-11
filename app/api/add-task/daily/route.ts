import { createDailyTask } from "@/db/db";
import { DailyTaskDBType } from "@/db/mongodb/models/DailyTaskModel";
import { DailyFormTypes } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestDataShema = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.string(),
  days: z.string().array().min(1),
  hours: z.string(),
  minutes: z.string(),
  user: z.string().email()
});
export async function POST(request: Request) {
  try {
    const data: DailyFormTypes = await request.json();
    const validatData = RequestDataShema.parse(data);
    const date = new Date()
    date.setHours(+validatData.hours)
    date.setMinutes(+validatData.minutes)
    const formatedData: Omit<DailyTaskDBType, "completed" | "createdAt" | "updatedAt"> = {
      name: validatData.name, 
      priority: validatData.priority, 
      days: validatData.days, 
      description: validatData.description, 
      dueTime: date
    }
    createDailyTask({taskData: formatedData, user: ""})
    //Not complete
    

    return NextResponse.json({ message: "done" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
