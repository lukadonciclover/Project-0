export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type TaskFilter = "all" | "active" | "completed";