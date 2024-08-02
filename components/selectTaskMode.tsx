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
} from "./ui/select"

type Props = {
    setTaskMode: Dispatch<SetStateAction<string>>
}
export default function SelectTaskMode({ setTaskMode }: Props) {
    return (
        <Select onValueChange={(value) => setTaskMode(value)}>
            <SelectTrigger className="h-[30px] w-[100px] p-1 px-2 focus:border-transparent focus:ring-0 focus-visible:ring-0">
                <SelectValue
                    className="focus-visible:ring-0"
                    placeholder="Daily"
                />
            </SelectTrigger>
            <SelectContent className="focus-visible:ring-0">
                <SelectGroup className="focus-visible:ring-0">
                    <SelectLabel className="focus-visible:ring-0">
                        Daily
                    </SelectLabel>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Once-off">Once-off</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
