import supabase from "./supabase/client";
import { z } from "zod";
import dbConnect from "./mongodb/client";
import UserModel from "./mongodb/models/User";
import bcrypt from "bcrypt";
import { DailyTaskDBType, GoogleUser } from "@/lib/types";
import redis from "./redis/client";
import DailyTasksListModel from "./mongodb/models/DailyTasksListModel";
import DailyTask from "./mongodb/models/DailyTaskModel";
// import DailyTask, { DailyTaskDBType } from "./mongodb/models/DailyTaskModel";

export type LoginReturnType = {
  user: {
    name: string;
    email: string;
    id: string;
  } | null;
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

export type RedisUser = {
  name: string;
  email: string;
  password: string;
  authType: string[];
} | null;

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

export const google = async (user: GoogleUser): Promise<boolean> => {
  if (!user) return false;
  try {
    const userFromRedis = await redis.get(`user:email:${user.email}`);
    if (userFromRedis) {
      return true;
    }
    dbConnect();
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      const authTypes: Array<string> = existingUser.authType;
      if (!authTypes.includes("GOOGLE")) {
        authTypes.push("GOOGLE");
        existingUser.authType = authTypes;
        existingUser.save();
      }
      return true;
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
      }),
    );
    return true;
  } catch (error) {
    throw new Error("Database error!");
  }
};

export const createDailyTasksList = async (
  userId: string,
): Promise<string | null> => {
  const dailyTasksList = await new DailyTasksListModel({
    taskIds: [],
  }).save();
  if (dailyTasksList) {
    console.log(dailyTasksList._id);
  }
  return null;
};

export const register = async ({
  name,
  email,
  password,
}: z.infer<typeof registerSchema>): Promise<RegisterReturnType> => {
  try {
    //connecting to the database
    const user = await redis.get(`user:email:${email}`);
    //checking if user already exists
    if (user) {
      return { user: null, error: { message: "User already exists" } };
    }
    dbConnect();
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
        password: hashedPassword,
        authType: ["CRED"],
      }),
    );
    return { user: { name: name, email, id: userId }, error: null };
  } catch (error) {
    console.log(error);
    throw new Error("Database error!");
  }
};

export const getUserIdByEmail = async (
  email: string,
): Promise<string | null> => {
  const userId: string | null = await redis.get(`user:email:${email}`);
  return userId;
};

export const login = async ({
  email,
  password,
}: z.infer<typeof loginSchema>): Promise<LoginReturnType> => {
  try {
    const userId = await getUserIdByEmail(email);
    if (!userId) {
      return { user: null, error: { message: "User not found" } };
    }
    const user: RedisUser = await redis.get(`user:${userId}`);
    if (!user) {
      return { user: null, error: { message: "User not found" } };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { user: null, error: { message: "Invalid credentials" } };
    }

    return {
      user: { email: user.email, name: user.name, id: userId },
      error: null,
    };
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
    dbConnect();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const createDailyTask = async ({
  taskData,
  userId,
}: {
  taskData: Omit<DailyTaskDBType, "createdAt" | "updatedAt">;
  userId: string;
}) => {
  const newDailyTask = await new DailyTask({
    ...taskData,
  });
};
