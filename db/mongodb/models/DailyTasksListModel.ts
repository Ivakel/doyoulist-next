
import mongoose, { Document, Schema } from "mongoose";

export type DailyTasksListShema = Document & {
    taskIds: Array<string>
} ;

const dailyTasksListShema: Schema = new mongoose.Schema(
  {
    taskIds: {
        type: Array
    }
  },
  {
    timestamps: true,
  }
);

const DailyTasksListModel = mongoose.model<DailyTasksListShema>("DailyTasksList", dailyTasksListShema);
export default DailyTasksListModel;