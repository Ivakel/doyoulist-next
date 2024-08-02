import { checkUserExistence } from "@/db/db"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: { email: string } },
) {
    try {
        const url = new URL(request.url)
        const email = url?.searchParams.get("email")
        if (!email) {
            throw new Error("Email not found")
        }
        const userExist = await checkUserExistence({ email: email })
        return NextResponse.json({ existence: userExist }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error })
    }
}
