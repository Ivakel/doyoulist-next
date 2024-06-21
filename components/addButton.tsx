import Image from "next/image";
import { Button } from "./ui/button";
import AddSvg from "@/public/svg/plus icon.svg";

export default function AddButton() {
  return (
    <Button className="w-auto bg-transparent outline-1 text-slate-500 gap-4 hover:bg-[#f7f7f7] rounded-md">
      <Image src={AddSvg} width={20} height={20} alt="add icon" />
      <h3 className="font-semibold">{"Add task"}</h3>
    </Button>
  );
}
