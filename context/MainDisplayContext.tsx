import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react"

type DisplayType =
    | "DAILY_TASK_FORM"
    | "ONETIME_TASK_FORM"
    | "EDIT_DAILY_TASK_FORM"
    | "EDIT_ONETIME_TASK_FORM"
    | "NULL"
    | "TASK_FORM"
export type MainDisplayContextType = {
    toDisplay: DisplayType
    setToDisplay: Dispatch<SetStateAction<DisplayType>>
}
const MainDisplayContext = createContext<MainDisplayContextType | null>(null)

type Props = {
    children: React.ReactNode
}
export const MainDisplayContextProvider = ({ children }: Props) => {
    const [toDisplay, setToDisplay] = useState<DisplayType>("NULL")
    return (
        <MainDisplayContext.Provider value={{ toDisplay, setToDisplay }}>
            {children}
        </MainDisplayContext.Provider>
    )
}

export const useMainDisplay = () => {
    const context = useContext(MainDisplayContext)
    if (!context) {
        throw new Error("Please use ThemeProvider in parent component")
    }
    return context
}

export default MainDisplayContext
