import { createContext, Dispatch, SetStateAction, useState } from "react"

export type DisplayType =
    | "DAILY_TASK_FORM"
    | "ONETIME_TASK_FORM"
    | "EDIT_DAILY_TASK_FORM"
    | "EDIT_ONETIME_TASK_FORM"
    | "NULL"
    | "TASK_FORM"
    | "TASK_INSTRUCTIONS"
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

export default MainDisplayContext
