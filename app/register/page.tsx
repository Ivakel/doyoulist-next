"use server"
import RegisterForm from "./RegisterForm";

async function page() {
  return (
    <section className="flex flex-col">
      <RegisterForm />
    </section>
  );
}


export default page;
