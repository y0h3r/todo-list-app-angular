import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from '@features/landing/state/user.actions';
import { UserService } from '@features/landing/landing.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) =>
        this.userService.getUser(action.email).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) =>
            of(
              UserActions.loadUserFailure({
                error: { message: error.error.message, status: error.status },
              })
            )
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => UserActions.createUserSuccess({ user })),
          catchError((error) =>
            of(
              UserActions.createUserFailure({
                error: { message: error.error.message, status: error.status },
              })
            )
          )
        )
      )
    )
  );
}
