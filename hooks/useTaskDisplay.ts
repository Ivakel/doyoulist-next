import TaskDisplayContext, {
    TaskDisplayContextType,
} from "@/context/taskDisplayContext"
import { useContext } from "react"

export const useTaskDisplay = (): TaskDisplayContextType => {
    const context = useContext(TaskDisplayContext)

    if (!context) {
        throw new Error("Please use ThemeProvider in parent component")
    }

    return context
}
