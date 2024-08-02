import mongoose, { Document, Schema, Types } from "mongoose"

export type DailyTasksListDBType = Document & {
    taskIds: Array<{
        type: Types.ObjectId
        ref: "DailyTask"
    }>
}

const dailyTasksListShema: Schema = new mongoose.Schema(
    {
        taskIds: {
            type: [
                {
                    type: Types.ObjectId,
                    ref: "DailyTask",
                },
            ],
        },
    },
    {
        timestamps: true,
    },
)

const DailyTasksListModel =
    mongoose.models.DailyTasksList ||
    mongoose.model<DailyTasksListDBType>("DailyTasksList", dailyTasksListShema)
export default DailyTasksListModel
