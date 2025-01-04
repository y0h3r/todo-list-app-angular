export interface Task {
  user?: string;
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: { status: number; message: string } | null;
}

export const initialTaskstate: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};
