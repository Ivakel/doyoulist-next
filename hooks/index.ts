import { OneTimeTaskType } from "@/lib/types"
import { createGlobalState } from "@/state"

export const useEditOnetimeData = createGlobalState<OneTimeTaskType>(
    "editOnetimeTaskData",
)
