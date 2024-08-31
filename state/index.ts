import { OneTimeTaskType } from "@/lib/types"
import { create } from "zustand"

type State = {
    taskData: OneTimeTaskType | undefined
}

type Actions = {
    setTaskdata: (task: OneTimeTaskType) => void
}

export const useEditOnetimeData = create<State & Actions>((set) => ({
    taskData: undefined,
    setTaskdata: (task: OneTimeTaskType) =>
        set((state) => ({ taskData: task })),
}))
