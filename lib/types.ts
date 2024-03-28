export type TodayTaskItem = {
  dueTime: string;
  id: string;
  taskName: string;
  complete: boolean;
};
export type WeeklyTaskItem = {
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  id: string;
  taskName: string;
  complete: boolean;
};

export type Params = {
  tasksId: string;
};

export type HandleTodoActionTypes = { id: string; complete: boolean };
