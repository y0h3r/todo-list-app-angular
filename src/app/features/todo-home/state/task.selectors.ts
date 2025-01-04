import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '@features/landing/state/user.state';
import { TaskState } from '@features/todo-home/state/task.state';

export const selectUserState = createFeatureSelector<UserState>('users');
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

export const selectLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);
