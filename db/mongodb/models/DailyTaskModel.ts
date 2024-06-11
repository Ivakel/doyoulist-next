import mongoose, { Document, Schema } from "mongoose";

// Define interface for Todo document
export type DailyTaskDBType = {
  name: string;
  description: string;
  priority: string;
  completed: boolean;
  dueTime: string;
  days: string[];
  createdAt: Date;
  updatedAt: Date;
};
export type DailyTaskMongoType = DailyTaskDBType & Document & {};

// Define schema for Todo document
const todoSchema = new Schema<DailyTaskMongoType>({
  name: {
    type: String,
    required: true,
  },
  priority: {
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
  days: {
    type: [String],
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
