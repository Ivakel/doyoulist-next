import NavBar from "@/components/navBar"
import Hero from "./hero"

export default function Home() {
    return (
        <main className="text-avenir-heavey flex min-h-screen flex-col items-center bg-[#B7EAC4] p-4">
            <NavBar />
            <Hero />
        </main>
    )
}
