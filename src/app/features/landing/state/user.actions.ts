import { createAction, props } from '@ngrx/store';
import { User } from '@features/landing/state/user.state';

export const loadUser = createAction(
  '[User] Load User',
  props<{ email: string }>()
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: { status: number; message: string } }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{ user: User }>()
);
export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: { status: number; message: string } }>()
);
