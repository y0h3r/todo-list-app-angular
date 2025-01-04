import { createReducer, on } from '@ngrx/store';
import { initialUsertate } from '@features/landing/state/user.state';
import * as UserActions from '@features/landing/state/user.actions';

export const userReducer = createReducer(
  initialUsertate,
  on(UserActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
