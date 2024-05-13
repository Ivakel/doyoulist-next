"use server";
import { getServerSession } from "next-auth";
import LoginForm from "./loginForm";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function page() {
  // const session = await getServerSession(options);
  // if (session) {
  //   return redirect("/home");
  // }
  return (
    <section className="flex flex-col">
      <LoginForm />
    </section>
  );
}

export default page;
