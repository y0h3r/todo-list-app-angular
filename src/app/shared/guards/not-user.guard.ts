import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectedUser } from '@features/landing/state/user.selectors';
import { map, Observable } from 'rxjs';

export const notUserGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectedUser).pipe(
    map((user) => {
      if (user) {
        router.navigate(['/todo']);
        return false;
      }
      return true;
    })
  );
};
