import MainDisplayContext from "@/context/MainDisplayContext"
import { useContext } from "react"

export const useMainDisplay = () => {
    const context = useContext(MainDisplayContext)
    if (!context) {
        throw new Error("Please use ThemeProvider in parent component")
    }
    return context
}
