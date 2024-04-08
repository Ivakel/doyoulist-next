import { Form } from "@/components/ui/form";
import { GetStaticProps } from "next";
import RegisterForm from "./RegisterForm";

async function page() {
  return (
    <section className="flex flex-col">
      <RegisterForm />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default page;
