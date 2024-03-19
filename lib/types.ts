export type TaskItem = {
  dueDate: string;
  id: string;
  taskName: string;
  complete: boolean;
};

export type Params = {
  tasksId: string;
};

export type HandleTodoActionTypes = { id: string; complete: boolean };
