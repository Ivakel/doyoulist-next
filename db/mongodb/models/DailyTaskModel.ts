import { DailyTaskDBType } from "@/lib/types";
import mongoose, { Document, Schema } from "mongoose";



export type DailyTaskMongoType =  Document & DailyTaskDBType;

const todoSchema: Schema = new mongoose.Schema({
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
    type: Date,
    required: true,
  },
  days: {
    type: Array,
  }
}, {
  timestamps: true
});


const DailyTask = mongoose.models.DailyTask || mongoose.model<DailyTaskMongoType>("DailyTask", todoSchema);

export default DailyTask;
