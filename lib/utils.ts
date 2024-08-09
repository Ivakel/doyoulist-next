import chatGPT from "@/chatGPT/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TodayTaskItem } from "./types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function getDate() {
    const date = new Date()
    const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ]

    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const weekday = weekdays[date.getDay()]
    const month = months[date.getMonth()]
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return { day, weekday, month }
}

export function getCurrentTime() {
    const d = new Date()
    let hour = d.getHours()
    let minute = d.getMinutes()
    return { hour, minute }
}

export const makeBreadcrumbs = (tasks: string[] | undefined): string => {
    let s = ""
    if (!tasks) return s
    let done = false
    tasks.map((taskName, index) => {
        if (done) {
            return
        }

        for (let i = 0; i < taskName.length; i++) {
            if (s.length === 31) {
                s += "..."
                done = true
                break
            }
            s += taskName[i]
        }
        s += ">"
    })
    return s
}
const instructionsToArray = (
    st: string,
): { no: number; instruction: string }[] => {
    let index = 1
    let instructions: { no: number; instruction: string }[] = []
    const a = JSON.parse(st)
    for (let i = 1; i < 6; i++) {
        instructions.push({ no: i, instruction: a[`${i}`] })
    }

    return instructions
}
export async function getInstructions(task: {
    name: string
    description: string
}): Promise<{ no: number; instruction: string }[]> {
    const instructions = await chatGPT(task)
    const instructionArray = instructionsToArray(instructions)
    return instructionArray
}
