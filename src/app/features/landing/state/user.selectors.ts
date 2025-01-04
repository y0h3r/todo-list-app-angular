import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '@features/landing/state/user.state';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectedUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);
