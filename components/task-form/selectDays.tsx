import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import Calender from "@/public/svg/calender.svg"
import { useState } from "react";

export default function SelectDays () {
    const [isopen, setIsopen] = useState<boolean>(true)
    const items = ["Today", "Tomorrow", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return (
        <div className="w-32">
            <div className="flex gap-1 justify-center items-center border-[1px] w-[100px] h-[30px] rounded-md">
                <Image className="size-5" src={Calender} width={20} height={20} alt="a calender icon"/>
                <h2 className="font-semibold w-[100px]">Select days</h2>
            </div>
            <ul className={`${isopen? "": "hidden"}`}>
            {items.map((item, index) => {
                return (<li className="flex items-center gap-2">
                <Checkbox id={`${item}-${index}`}/>
                <h3 className="text-lg">{item}</h3>
            </li>)
            })}
        </ul>
        </div>
    )
}