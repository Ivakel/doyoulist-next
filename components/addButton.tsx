import Image from "next/image"
import { Button } from "./ui/button"
import AddSvg from "@/public/svg/plus icon.svg"
import { useMainDisplay } from "@/context/MainDisplayContext"

export default function AddButton() {
    const { setToDisplay } = useMainDisplay()

    return (
        <Button
            onClick={() => setToDisplay("TASK_FORM")}
            className="w-auto gap-4 rounded-md bg-transparent text-slate-500 outline-1 hover:bg-[#f7f7f7]"
        >
            <Image src={AddSvg} width={20} height={20} alt="add icon" />
            <h3 className="font-semibold">{"Add task"}</h3>
        </Button>
    )
}
