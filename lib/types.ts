import { IUser } from "@/db/mongodb/models/User";

export type TodayTaskItem = {
  dueTime: string;
  id: string;
  taskName: string;
  complete: boolean;
};

export type Instruction = {
  id: number;
  title: string;
  description: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  authType: Array<string>,
  image: string,
};

export interface GetUserReturnType {
  user: IUser | null;
  error: {
    message: string;
  } | null;
}
export type TaskDisplay = {
  instruction: Instruction;
};
export type WeeklyTaskItem = {
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  id: string;
  taskName: string;
  complete: boolean;
};

export type GoogleUser = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined


export type Params = {
  tasksId: string;
};

export type HandleTodoActionTypes = { id: string; complete: boolean };
