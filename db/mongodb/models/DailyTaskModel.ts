import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Todo document
export interface DailyTaskType extends Document {
  title: string;
  description: string;
  completed: boolean;
  dueTime: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define schema for Todo document
const todoSchema = new Schema<DailyTaskType>({
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
  dueTime: {
    type: String,
    required: true
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
const DailyTask = mongoose.model<DailyTaskType>('DailyTask', todoSchema);

export default DailyTask;
