import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Todo document
export interface WeeklyTaskType extends Document {
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
  priority: "LOW" | "MEDIUM" | "HIGH"
}

// Define schema for Todo document
const todoSchema = new Schema<WeeklyTaskType>({
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
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Define and export Todo model
const WeeklyTask = mongoose.model<WeeklyTaskType>('DailyTask', todoSchema);

export default WeeklyTask;
