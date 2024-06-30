import { User as UserType } from "@/lib/types";
import mongoose, { Document, Schema, Types } from "mongoose";

export type IUser = Document & UserType;
const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    dailyTasksListId: {
      type: Types.ObjectId,
      required: true,
      ref: "DailyTask",
    },
    onetimeTasksListId: {
      type: Types.ObjectId,
      required: true,
      ref: "OnetimeTask",
    },
    authType: {
      type: Array,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;
