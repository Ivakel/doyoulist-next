import mongoose, { Document, Schema, Types } from "mongoose"

export type DailyTasksListDBType = Document<{
    taskIds: Array<Types.ObjectId>
}> & {
    taskIds: Array<Types.ObjectId>
}

const dailyTasksListShema: Schema = new mongoose.Schema(
    {
        taskIds: {
            type: [Types.ObjectId],
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
