import { DailyFormTypes } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestDataShema = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.string(),
  days: z.string().array(),
  hours: z.string(),
  minutes: z.string(),
});
export async function POST(request: Request) {
  try {
    const data: DailyFormTypes = await request.json();
    const validatData = RequestDataShema.parse(data);
    console.log(validatData);

    return NextResponse.json({ message: "done" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
