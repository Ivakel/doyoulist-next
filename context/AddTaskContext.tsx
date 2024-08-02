import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react"

export type AddTaskContextType = {
    addTask: boolean
    setAddTask: Dispatch<SetStateAction<boolean>>
}
const AddTaskContext = createContext<AddTaskContextType | null>(null)

type Props = {
    children: React.ReactNode
}
export const AddTaskContextProvider = ({ children }: Props) => {
    const [addTask, setAddTask] = useState<boolean>(false)
    return (
        <AddTaskContext.Provider value={{ addTask, setAddTask }}>
            {children}
        </AddTaskContext.Provider>
    )
}

export const useAddTask = () => {
    const context = useContext(AddTaskContext)
    if (!context) {
        throw new Error("Please use ThemeProvider in parent component")
    }
    return context
}

export default AddTaskContext
