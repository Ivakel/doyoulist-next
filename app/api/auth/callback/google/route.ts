import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { taskId: string; complete: boolean } }
) {
  try {
    console.log("google callback url");

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error });
  }
}
