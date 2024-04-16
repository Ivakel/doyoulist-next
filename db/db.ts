import { TodayTaskItem, WeeklyTaskItem } from "@/lib/types";
import supabase from "./supabase/client";
import { z } from "zod";
const bcrypt = require("bcrypt");

export const getTodayTaskList = async () => {
  const { data, error } = await supabase.from("todayTasks").select();
  return { data, error };
};

const dataSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string(),
  action: z.string(),
});
export const getUser = async ({
  email,
  password,
  action,
}: z.infer<typeof dataSchema>) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  if (action === "REGISTER") {
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword }]);
    if (!data) {
      return { user: null, error };
    }
    return { user: data[0], error };
  }
  if (action === "LOGIN") {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();
    if (!data) {
      return { user: null, error };
    }
    const isValid = await bcrypt.compare(hashedPassword, data.password);
    if (!isValid) {
      return { user: null, error };
    }
    return { user: data, error };
  }
  return { user: null, error: null };
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
