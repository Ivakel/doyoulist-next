import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import Calender from "@/public/svg/calender.svg"
import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
    setDays:  Dispatch<SetStateAction<Set<string>>>
}

export default function SelectDays ({setDays}: Props) {
    const [isopen, setIsopen] = useState<boolean>(false)
    const items = ["Today", "Tomorrow", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return (
        <div className="w-[130px] h-[30px]">
            <button className="flex gap-1 items-center border-[1px] w-[130px] h-[30px] rounded-md"
                onClick={() => {
                    setIsopen((value) => {
                        return !value
                    })
                }}
            >
                <Image className="size-5" src={Calender} width={20} height={20} alt="a calender icon"/>
                <h2 className="text-sm">Select days</h2>
                <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            <ul className={`${isopen? "": "hidden"} w-[130px] px-2 border-1 border-slate-200 days gap-2 transition-all duration-1000`}>
            {items.map((item, index) => {
                return (<li className="flex items-center gap-2 w-[120px] hover:bg-slate-100 py-2">
                <Checkbox id={`day-${index}`} className="size-4 rounded-sm"
                    onCheckedChange={() => {
                        setDays((days) => {
                            if (!days.has(`day-${index}`)) {
                                days.add(`day-${index}`)
                            } else {
                                days.delete(`day-${index}`)
                            }
                            return days;
                        })
                    }}
                    
                />
                <h3 className="text-sm">{item}</h3>
            </li>)
            })}
        </ul>
        </div>
    )
}