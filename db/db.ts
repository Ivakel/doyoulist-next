import { TodayTaskItem, WeeklyTaskItem } from "@/lib/types";

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
    taskName: "wedding",
    dueDate: new Date(),
    dueTime: "14:30",
    priority: "high",
    complete: true,
    id: "1",
  },
  {
    taskName: "physics assignment",
    dueDate: new Date(),
    dueTime: "15:30",
    priority: "high",
    complete: true,
    id: "2",
  },
];

export const getTodayTaskList = () => {
  return todayTasks;
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
