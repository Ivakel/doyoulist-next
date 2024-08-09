import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react"

export type InstructionType = {
    no: number
    instruction: string
}

export type TaskDisplayType = {
    name: string
    id: string
    instructions: InstructionType[]
}
export type TaskDisplayContextType = {
    taskDisplay: TaskDisplayType | null
    setTaskDisplay: Dispatch<SetStateAction<TaskDisplayType | null>>
}
const TaskDisplayContext = createContext<TaskDisplayContextType | null>(null)

type Props = {
    children: React.ReactNode
}
export const TaskDisplayContextProvider = ({ children }: Props) => {
    const [taskDisplay, setTaskDisplay] = useState<TaskDisplayType | null>(null)
    return (
        <TaskDisplayContext.Provider value={{ taskDisplay, setTaskDisplay }}>
            {children}
        </TaskDisplayContext.Provider>
    )
}

export const useTaskDisplay = () => {
    const context = useContext(TaskDisplayContext)
    if (!context) {
        throw new Error("Please use ThemeProvider in parent component")
    }
    return context
}

export default TaskDisplayContext
