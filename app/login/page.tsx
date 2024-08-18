"use server"

import LoginForm from "./loginForm"
async function page() {
    return (
        <section className="flex flex-col">
            <LoginForm />
        </section>
    )
}

export default page
