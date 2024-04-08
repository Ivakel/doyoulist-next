import { TodayTaskItem, WeeklyTaskItem } from "@/lib/types";
import supabase from "./supabase/client";

/*
Organize Your Workspace: Set up a clean and organized workspace free from distractions. Gather all necessary materials such as textbooks, notebooks, pens, and any relevant resources before you start.

Understand the Assignment: Read through the homework instructions carefully to fully understand what is being asked of you. If there are any unclear instructions, don't hesitate to ask for clarification from your teacher or classmates.

Plan Your Approach: Break down the assignment into smaller tasks and create a plan for tackling each one. Prioritize tasks based on deadlines and complexity. Consider using techniques like the Pomodoro Technique to work in focused bursts with short breaks in between.

Stay Focused and Avoid Procrastination: Minimize distractions by turning off your phone or using apps that block distracting websites. Stay disciplined and avoid procrastination by committing to completing each task within the allotted time frame.

Review and Revise: Once you've completed your homework, take some time to review your work and make any necessary revisions. Double-check for errors, ensure that your answers are thorough and well-explained, and make any final adjustments before submitting your homework.

*/

export const getTodayTaskList = async () => {
  const { data, error } = await supabase.from("todayTasks").select();
  return { data, error };
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
