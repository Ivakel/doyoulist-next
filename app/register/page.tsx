"use server";
import { getServerSession } from "next-auth";
import RegisterForm from "./RegisterForm";
import { options } from "../api/auth/[...nextauth]/options";

async function page() {
  const session = await getServerSession(options);
  if (session) {
    console.log("register");
    console.log(session);
  }
  return (
    <section className="flex flex-col">
      <RegisterForm />
    </section>
  );
}

export default page;
