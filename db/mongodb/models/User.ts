import { User as UserType } from "@/lib/types";
import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuid } from "uuid";

export type IUser = Document & UserType;

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todayTasksId: {
    type: String,
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
