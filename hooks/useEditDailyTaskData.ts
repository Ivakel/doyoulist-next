import EditDailyTaskContext from "@/context/EditDailyTaskDataContext"
import { useContext } from "react"

export const useEditDailyTaskData = () => {
    const context = useContext(EditDailyTaskContext)
    if (!context) {
        throw new Error("Please use ThemeProvider in parent component")
    }
    return context
}
