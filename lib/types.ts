import { PostgrestError } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";

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
  name: string;
  email: string;
};

export interface GetUserReturnType {
  user: User | null;
  error: PostgrestError | null;
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

export type Params = {
  tasksId: string;
};

export type HandleTodoActionTypes = { id: string; complete: boolean };
