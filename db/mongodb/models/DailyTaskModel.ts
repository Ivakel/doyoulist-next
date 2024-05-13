import mongoose, { Document, Schema } from "mongoose";

// Define interface for Todo document
export type DailyTaskType = {
  title: string;
  description: string;
  completed: boolean;
  dueTime: string;
  createdAt: Date;
  updatedAt: Date;
};
export type DailyTaskMongoType = DailyTaskType & Document & {};

// Define schema for Todo document
const todoSchema = new Schema<DailyTaskMongoType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  dueTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define and export Todo model
const DailyTask = mongoose.model<DailyTaskMongoType>("DailyTask", todoSchema);

export default DailyTask;
