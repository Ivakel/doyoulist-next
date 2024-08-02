"use client"
import { Dispatch, SetStateAction } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

type Props = {
    setPriority: Dispatch<SetStateAction<"low" | "medium" | "high">>
}
export default function SelectPriority({ setPriority }: Props) {
    return (
        <Select
            onValueChange={(value) => {
                setPriority(value as "low" | "medium" | "high")
            }}
        >
            <SelectTrigger className="h-[30px] w-[100px] p-1 px-2 focus:border-transparent focus:ring-0 focus-visible:ring-0">
                <SelectValue placeholder="Priority" className="w-[90px]" />
            </SelectTrigger>
            <SelectContent className="w-[90px]">
                <SelectGroup className="">
                    <SelectLabel className="">Priority</SelectLabel>
                    <SelectItem value="low" className="">
                        Low
                    </SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
