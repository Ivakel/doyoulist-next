import { TodayTaskItem } from "@/lib/types"
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react"

export type EditDailyTaskContextType = {
    taskData: TodayTaskItem | null
    setTaskData: Dispatch<SetStateAction<TodayTaskItem | null>>
}
const EditDailyTaskContext = createContext<EditDailyTaskContextType | null>(
    null,
)

type Props = {
    children: React.ReactNode
}
export const EditDailyTaskContextProvider = ({ children }: Props) => {
    const [taskData, setTaskData] = useState<TodayTaskItem | null>(null)
    return (
        <EditDailyTaskContext.Provider value={{ taskData, setTaskData }}>
            {children}
        </EditDailyTaskContext.Provider>
    )
}

export default EditDailyTaskContext
