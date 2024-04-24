import { User as UserType } from "@/lib/types";
import mongoose, { Document, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

export type IUser = Document & UserType;

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  todayTasksId: {
    type: String,
  },
}, {
  timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;
