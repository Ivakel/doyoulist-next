import { IUser } from "@/db/mongodb/models/User";
import { Types } from "mongoose";

export type TodayTaskItem = {
  id: string;
  name: string;
  instructions: {
    no: number,
    instruction: string
  }[];
  description: string;
  priority: string;
  completed: boolean;
  dueTime: Date;
  days: Array<string>;
};

export type DailyFormTypes = {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  days: string[];
  hours: string;
  minutes: string;
};

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
};

export type DailyTaskDBType = {
  name: string;
  description: string;
  instructions: {
    no: number,
    instruction: string
  }[]
  priority: string;
  completed: boolean;
  dueTime: Date;
  days: Array<string>;
};

export type Instruction = {
  id: number;
  title: string;
  description: string;
};

export type OneTimeTaskType = {
  id: string;
  name: string;
  description: string;
  instructions: Array<string>;
  completed: boolean;
  dueDate: Date;
  priority: "low" | "medium" | "high";
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  authType: Array<string>;
  dailyTasksListId: Types.ObjectId;
  onetimeTasksListId: Types.ObjectId;
  image: string;
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
export type OnetimeTask = {
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  id: string;
  taskName: string;
  complete: boolean;
};

export type GoogleUser =
  | {
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
    }
  | undefined;

export type Params = {
  tasksId: string;
};

export type HandleTodoActionTypes = { id: string; complete: boolean };
