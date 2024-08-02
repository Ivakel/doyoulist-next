"use server"
import { getServerSession } from "next-auth"
import RegisterForm from "./RegisterForm"
import { options } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

async function page() {
    const session = await getServerSession(options)
    if (session) {
        return redirect("/home")
    }
    return (
        <section className="flex flex-col">
            <RegisterForm />
        </section>
    )
}

export default page
