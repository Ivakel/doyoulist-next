import { OneTimeTaskType } from "@/lib/types";
import mongoose, { Document, Schema } from "mongoose";

export type OnetimeDBType = OneTimeTaskType & Document;

const onetimeTaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: [String],
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const OnetimeTaskModel =
  mongoose.models.OnetimeTask ||
  mongoose.model<OnetimeDBType>("OnetimeTask", onetimeTaskSchema);

export default OnetimeTaskModel;
