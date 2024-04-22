import {
  GetUserReturnType,
  TodayTaskItem,
  User,
  WeeklyTaskItem,
} from "@/lib/types";
import supabase from "./supabase/client";
import { z } from "zod";
import { PostgrestError } from "@supabase/supabase-js";
import dbConnect from "./mongodb/client";
import UserModel from "./mongodb/models/User";
const bcrypt = require("bcrypt");

export const getTodayTaskList = async () => {
  const { data, error } = await supabase.from("todayTasks").select();
  return { data, error };
};

const registerSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string(),
  username: z.string(),
});

export const register = async ({
  username,
  email,
  password

}: z.infer<typeof registerSchema> ) => {
  try {
    //connecting to the database
    dbConnect();
    //checking if user already exists
    const user = await User.findOne({ email: email })
    if (user) {
      return { user: null, error: {message: "User already exists"} };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new UserModel({
      email: email,
      username: username,
      password: hashedPassword,
    }).save();
    return { user: newUser, error: null }
  } catch (error) {
    return { user: null, error: {message: "Database error"} };
  }
};

export const login = async () => {
  try {
      
    dbConnect();
    const user = await User.findOne({ email: email })
    console,log(user)
    //  Testing purposes
    if (!user) {
      return { user: null, error: {message: "User not found"} };
    }
    return { user: null, error: null }
  } catch (error) {

    return { user: null, error: null };
  }
}
export const getUser = async ({
  email,
  password,
  action,
  username,
}: z.infer<typeof dataSchema>): Promise<GetUserReturnType> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  if (action === "REGISTER") {
    try {
      console.log("here bro");
      //connecting to the database
      dbConnect();
      //checking if user already exists
      const user = await User.findOne({ email: email })
      if (user) {
        return { user: null, error: {message: "User already exists"} };
      }
      const newUser = await new UserModel({
        email: email,
        username: username,
        password: hashedPassword,
      }).save();
      return { user: newUser, error: null }

    } catch (error) {
      return { user: null, error: {message: "Database error"} };
    }
  }
  if (action === "LOGIN") {
    
};
export const getTodayTask = async (id: string) => {
  const { data, error } = await supabase
    .from("todayTasks")
    .select()
    .eq("id", id);
  return { data, error };
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
