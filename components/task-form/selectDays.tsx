import Image from "next/image"
import { Checkbox } from "../ui/checkbox"
import Calender from "@/public/svg/calender.svg"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { MultiSelect } from "../multiSelect"

type Props = {
    days: string[]
    setDays: Dispatch<SetStateAction<string[]>>
}
const daysList = [
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
]
export default function SelectDays({ setDays }: Props) {
    return (
        <div className="max-w-xl">
            <MultiSelect
                className="h-[30px] p-0"
                options={daysList}
                placeholder={
                    <div className="flex space-x-2">
                        <Image
                            className="size-5"
                            src={Calender}
                            width={20}
                            height={20}
                            alt="a calender icon"
                        />
                        <h2 className="text-sm">Select days</h2>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </div>
                }
                onValueChange={setDays}
                variant="default" // optional
            />
        </div>
    )
}
