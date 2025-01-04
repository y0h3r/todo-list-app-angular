import { createAction, props } from '@ngrx/store';
import { Task } from '@features/todo-home/state/task.state';

export const loadAllTasks = createAction(
  '[Task] Load All Tasks From User',
  props<{ userId: string }>()
);
export const loadAllTasksSuccess = createAction(
  '[Task] Load All Tasks From User Success',
  props<{ tasks: Task[] }>()
);
export const loadAllTasksFailure = createAction(
  '[Task] Load All Tasks From User Failure',
  props<{ error: { status: number; message: string } }>()
);

export const createTask = createAction(
  '[Task] Create Task For User',
  props<{ task: Omit<Task, 'id'> }>()
);
export const createTaskSuccess = createAction(
  '[Task] Create Task For User Success',
  props<{ task: Task }>()
);
export const createTaskFailure = createAction(
  '[Task] Create Task For User Failure',
  props<{ error: { status: number; message: string } }>()
);

export const updateTask = createAction(
  '[Task] Update Task For User',
  props<{ task: Partial<Task>; taskId: string }>()
);
export const updateTaskSuccess = createAction(
  '[Task] Update Task For User Success',
  props<{ changes: Partial<Task>; taskId: string }>()
);
export const updateTaskFailure = createAction(
  '[Task] Update Task For User Failure',
  props<{ error: { status: number; message: string } }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task For User',
  props<{ taskId: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Task] Delete Task For User Success',
  props<{ taskId: string }>()
);
export const deleteTaskFailure = createAction(
  '[Task] Delete Task For User Failure',
  props<{ error: { status: number; message: string } }>()
);
