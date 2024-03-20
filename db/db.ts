import { TaskItem } from "@/lib/types";

let tasks: TaskItem[] = [
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

export const getTaskList = () => {
  return tasks;
};

export const updateTaskList = (newTaskList: TaskItem[]) => {
  tasks = newTaskList;
  //TODO
};
