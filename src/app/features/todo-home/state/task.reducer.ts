import { createReducer, on } from '@ngrx/store';
import { initialTaskstate } from '@features/todo-home/state/task.state';
import * as TasksActions from '@features/todo-home/state/task.actions';

export const taskReducer = createReducer(
  initialTaskstate,
  on(TasksActions.loadAllTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TasksActions.loadAllTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks,
  })),
  on(TasksActions.loadAllTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TasksActions.createTask, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TasksActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    loading: false,
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.createTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TasksActions.updateTask, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TasksActions.updateTaskSuccess, (state, { changes, taskId }) => ({
    ...state,
    loading: false,
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, ...changes } : task
    ),
  })),
  on(TasksActions.createTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TasksActions.deleteTask, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    loading: false,
    tasks: state.tasks.filter((task) => task.id !== taskId),
  })),
  on(TasksActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
