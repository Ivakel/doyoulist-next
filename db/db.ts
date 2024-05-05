import supabase from "./supabase/client";
import { z } from "zod";
import dbConnect from "./mongodb/client";
import UserModel, { IUser } from "./mongodb/models/User";
import bcrypt from "bcrypt";
import { GoogleUser } from "@/lib/types";
import redis from "./redis/client";

export type LoginReturnType = {
  user: IUser | null;
  error: { message: string } | null;
};
export type RegisterReturnType = {
  user: {
    name: string;
    email: string;
    id: string;
  } | null;
  error: { message: string } | null;
};

export const getTodayTaskList = async () => {
  const { data, error } = await supabase.from("todayTasks").select();
  return { data, error };
};

const registerSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string(),
  name: z.string(),
});
const loginSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string(),
});

export const google = async (user: GoogleUser) => {
  if (!user) return;
  try {
    dbConnect();
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      const authTypes: Array<String> = existingUser.authType;
      if (!authTypes.includes("GOOGLE")) {
        authTypes.push("GOOGLE");
        existingUser.authType = authTypes;
        existingUser.save();
      }
      return;
    }
    const newUser = await new UserModel({
      email: user.email,
      name: user.name,
      authType: ["GOOGLE"],
      image: user.image,
    }).save();
    const userId = newUser._id.toString();
    redis.set(`user:email:${user.email}`, userId);
    redis.set(
      `user:${userId}`,
      JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        authType: ["GOOGLE"],
      })
    );
  } catch (error) {
    throw new Error("Database error!");
  }
};

export const register = async ({
  name,
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
      name: name,
      password: hashedPassword,
      authType: ["CRED"],
    }).save();
    const userId = newUser._id.toString();
    redis.set(`user:email:${email}`, userId);
    redis.set(
      `user:${userId}`,
      JSON.stringify({
        name,
        email,
        password,
        authType: ["CRED"],
      })
    );
    return { user: { name: name, email, id: userId }, error: null };
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

export const checkUserExistence = async ({ email }: { email: string }) => {
  try {
    console.log("in db");
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
