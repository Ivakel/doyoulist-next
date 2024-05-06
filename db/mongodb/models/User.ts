import { User as UserType } from "@/lib/types";
import mongoose, { Document, Schema } from "mongoose";

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
    todayTasksId: {
      type: String,
    },
    authType: {
      type: Array,
    },
    image: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;
