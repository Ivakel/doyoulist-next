"use server";
import { getServerSession } from "next-auth";
import RegisterForm from "./RegisterForm";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

async function page() {
  const session = await getServerSession(options);
  if (session) {
    signOut();
  }
  return (
    <section className="flex flex-col">
      <RegisterForm />
    </section>
  );
}

export default page;
