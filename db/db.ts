import { TodayTaskItem, WeeklyTaskItem } from "@/lib/types";
import supabase from "./supabase/client";

let todayTasks: TodayTaskItem[] = [
  {
    taskName: "Do laundry",
    dueDate: "14:30",
    complete: true,
    id: "1",
  },
  {
    taskName: "Do homework",
    dueDate: "15:30",
    complete: false,
    id: "2",
  },
];

let weeklyTasks: WeeklyTaskItem[] = [
  {
    taskName: "Wedding",
    dueDate: new Date().getDate() + "",
    dueTime: "14:30",
    priority: "high",
    complete: true,
    id: "1",
  },
  {
    taskName: "Physics assignment",
    dueDate: new Date().getDate() + "",
    dueTime: "15:30",
    priority: "low",
    complete: true,
    id: "2",
  },
];

export const getTodayTaskList = async () => {
  const {data, error} = await supabase
    .from("todayTasks")
    .select();
  ;
  return {data, error};
};

export const updateTodayTaskList = (newTodayTaskList: TodayTaskItem[]) => {
  todayTasks = newTodayTaskList;
  //TODO
};
export const getWeeklyTaskList = () => {
  return weeklyTasks;
};

export const updateWeeklyTaskList = (newWeeklyTaskList: WeeklyTaskItem[]) => {
  weeklyTasks = newWeeklyTaskList;
  //TODO
};
