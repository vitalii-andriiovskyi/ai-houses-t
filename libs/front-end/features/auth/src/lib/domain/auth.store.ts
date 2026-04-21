import { inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  merge,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { addSeconds, isBefore } from 'date-fns';

import { UserSignUp, UserStore } from '@fe/user';
import { LocalStorageService } from '@fe/shared';
import { AuthApi } from '../infrastructure/auth.api';
import { Role } from '@shared';

const TOKEN_KEY = 'id_token';
const EXPIRATION_KEY = 'expires_at';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _userStore = inject(UserStore);
  private _authAPI = inject(AuthApi);
  private _localStorage = inject(LocalStorageService);

  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();
  private _error = signal('');
  error = this._error.asReadonly();

  private _isAuthVisible = signal(false);
  isAuthVisible = this._isAuthVisible.asReadonly();

  private _isLoggedIn = new BehaviorSubject(this.isLoggedIn());
  isLoggedIn$ = this._isLoggedIn.asObservable();
  userLoggedIn$ = this.isLoggedIn$.pipe(
    filter((loggedIn) => loggedIn),
    switchMap(() => this._userStore.user$),
  );
  userLoggedOut$ = this.isLoggedIn$.pipe(
    filter((loggedIn) => !loggedIn),
    map(() => null),
  );
  user$ = merge(this.userLoggedIn$, this.userLoggedOut$);

  isAdmin$ = combineLatest([this.user$, this.isLoggedIn$]).pipe(
    filter(([user, loggedIn]) => (loggedIn && !!user) || !loggedIn),
    map(([user, loggedIn]) => {
      return loggedIn && user?.roles?.includes(Role.Admin) ? true : false;
    }),
  );

  signIn(email: string, password: string, role?: Role) {
    return this._authAPI.signIn({ email, password }, { role }).pipe(
      tap(({ access_token, expires_in }) => {
        this.setSession({ access_token, expires_in });
        this._isAuthVisible.set(false);
      }),
      switchMap(() => this._userStore.refetchUser()),
    );
  }

  signUp(userData: UserSignUp) {
    return this._authAPI.signUp(userData).pipe(
      tap(({ access_token, expires_in }) => {
        this.setSession({ access_token, expires_in });
      }),
      switchMap(() => this._userStore.refetchUser()),
    );
  }

  signOut() {
    this._isLoading.set(true);
    this._authAPI
      .signOut()
      .pipe(
        tap(() => {
          this._isLoading.set(false);
          this.clearSession();
        }),
        catchError((err) => {
          console.log('Sign out error:', err);
          this._isLoading.set(false);
          return of(err);
        }),
      )
      .subscribe();
  }

  toggleAuthModal() {
    this._isAuthVisible.update((visible) => !visible);
  }

  showAuthModal() {
    this._isAuthVisible.set(true);
  }

  hideAuthModal() {
    this._isAuthVisible.set(false);
  }

  public isLoggedIn() {
    const expiration = this.getExpiration();
    return expiration ? isBefore(new Date(), expiration) : false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expirationIn = this._localStorage.getItem(EXPIRATION_KEY);
    if (!expirationIn) {
      return null;
    }
    const expiresAt = JSON.parse(expirationIn);
    return new Date(expiresAt);
  }

  private setSession({
    access_token,
    expires_in,
  }: {
    access_token: string;
    expires_in: number;
  }) {
    const expiresAt = addSeconds(new Date(), expires_in);
    this._localStorage.setItem(TOKEN_KEY, access_token);
    this._localStorage.setItem(
      EXPIRATION_KEY,
      JSON.stringify(expiresAt.valueOf()),
    );
    this._isLoggedIn.next(true);
  }

  private clearSession() {
    this._localStorage.removeItem(TOKEN_KEY);
    this._localStorage.removeItem(EXPIRATION_KEY);
    this._isLoggedIn.next(false);
  }
}
