"use server";
import { getServerSession } from "next-auth";
import RegisterForm from "./RegisterForm";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function page() {
  return (
    <section className="flex flex-col">
      <RegisterForm />
    </section>
  );
}

export default page;
