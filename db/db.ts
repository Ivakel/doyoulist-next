import { TodayTaskItem, WeeklyTaskItem } from "@/lib/types";
import supabase from "./supabase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const getTodayTaskList = async () => {
  const { data, error } = await supabase.from("todayTasks").select();
  return { data, error };
};

const dataSchema = z.object({
  email: z.string().email("This is not a valid email."),
  hashedPassword: z.string(),
});
export const getUser = async ({
  email,
  hashedPassword,
}: z.infer<typeof dataSchema>) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .eq("password", hashedPassword);
  if (!data) {
    return { user: null, error };
  }
  return { user: data[0], error };
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
