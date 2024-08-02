import { User as UserType } from "@/lib/types"
import mongoose, { Document, Schema } from "mongoose"

export type IUser = Document & UserType

export type Instruction = {
    id: string
    sentence: string
}
export type DailyTask = {
    id: string
    taskName: string
    dueTime: Date
    instructions: Array<Instruction>
}
export type WeeklyTask = {
    id: string
    taskName: string
    dueDate: Date
    instructions: Array<Instruction>
}

export type TasksType = Document & {
    dailyTasks: DailyTask
    weeklyTasks: WeeklyTask
}
const tasksShema: Schema = new mongoose.Schema(
    {
        dailyTasks: {
            type: Array,
        },
        weeklyTasks: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
)

const TasksModel =
    mongoose.models.TasksModel || mongoose.model<TasksType>("Tasks", tasksShema)
export default TasksModel
