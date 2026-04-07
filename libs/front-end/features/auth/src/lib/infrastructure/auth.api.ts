import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APP_CONFIG_TOKEN } from '@fe/shared';
import { Credentials, UserSignUp } from '@shared';
import { shareReplay } from 'rxjs';
import { UserSignUpResponse } from './dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG_TOKEN);
  private apiUrl = this.config?.apiUrl;

  signIn = (data: Credentials) =>
    this.http.post<any>(`${this.apiUrl}/auth/login`, data).pipe(shareReplay());
  signOut = () => this.http.post(`${this.apiUrl}/auth/logout`, {});
  signUp = (data: UserSignUp) =>
    this.http.post<UserSignUpResponse>(`${this.apiUrl}/auth/register`, data);
}
