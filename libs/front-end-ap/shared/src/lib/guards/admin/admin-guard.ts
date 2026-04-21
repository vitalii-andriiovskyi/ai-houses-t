import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthStore } from '@fe/auth';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthStore);
  return authService.isAdmin$.pipe(
    tap((isAdmin) => {
      if (!isAdmin) {
        if (authService.isLoggedIn()) {
          authService.signOut();
        }
        router.navigate(['/sign-in']);
      }
    }),
  );
};
