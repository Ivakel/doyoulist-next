import supabase from "./supabase/client";
import { z } from "zod";
import dbConnect from "./mongodb/client";
import UserModel, { IUser } from "./mongodb/models/User";
import bcrypt from "bcrypt";
import { GoogleUser } from "@/lib/types";

export type LoginReturnType = {
  user: IUser | null;
  error: { message: string } | null;
};
export type RegisterReturnType = {
  user: IUser | null;
  error: { message: string } | null;
};

export const getTodayTaskList = async () => {
  const { data, error } = await supabase.from("todayTasks").select();
  return { data, error };
};

const registerSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string(),
  username: z.string(),
});
const loginSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string(),
});

export const google = async (user: GoogleUser) => {
  if (!user) return
  try {
    dbConnect()
    const existingUser = await UserModel.findOne({email: user.email})
    if (existingUser) {
      const authTypes: Array<String> = existingUser.authType
      console.log({authTypes})
      if (!authTypes.includes("GOOGLE")) {
        authTypes.push("GOOGLE")
        existingUser.authType = authTypes
      }
      return;
    }
    const newUser = await new UserModel({
      email: user.email,
      username: user.name,
      authType: ["GOOGLE"]
    }).save();
  } catch (error) {
    throw new Error("Database error!");
  }
};

export const register = async ({
  username,
  email,
  password,
}: z.infer<typeof registerSchema>): Promise<RegisterReturnType> => {
  try {
    //connecting to the database
    dbConnect();
    //checking if user already exists
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return { user: null, error: { message: "User already exists" } };
    }
    //hasing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new UserModel({
      email: email,
      username: username,
      password: hashedPassword,
      authType: ["CRED"]
    }).save();
    console.log({newUser})
    return { user: newUser, error: null };
  } catch (error) {
    throw new Error("Database error!");
  }
};

export const login = async ({
  email,
  password,
}: z.infer<typeof loginSchema>): Promise<LoginReturnType> => {
  try {
    dbConnect();
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { user: null, error: { message: "User not found" } };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { user: null, error: { message: "Invalid credentials" } };
    }

    return { user: user, error: null };
  } catch (error) {
    throw new Error("Database error!");
  }
};

export const updateTodayTask = async (id: string, complete: boolean) => {
  const { data, error } = await supabase
    .from("todayTasks")
    .update({ complete: complete })
    .eq("id", id);
  return { data, error };
};
export const updateWeeklyTask = async (id: string, complete: boolean) => {
  const { data, error } = await supabase
    .from("weeklyTasks")
    .update({ complete: complete })
    .eq("id", id);
  return { data, error };
};

export const getWeeklyTaskList = async () => {
  const { data, error } = await supabase.from("weeklyTasks").select();
  return { data, error };
};

export const checkUserExistence = async ({email}: {email: string}) => {
  try {
    console.log("in db")
    const user = await UserModel.findOne({email});
  if (!user) {
    return false;
  }
  return true;
  } catch (error) {

    return false
  }
}
