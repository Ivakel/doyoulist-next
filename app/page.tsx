import NavBar from "@/components/navBar";
import Hero from "./hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-avenir-heavey min-h-screen p-4 bg-[#B7EAC4]">
      <NavBar />
      <Hero />
    </main>
  );
}
