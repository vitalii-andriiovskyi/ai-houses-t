import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APP_CONFIG_TOKEN } from '@fe/shared';
import { User } from '../domain/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG_TOKEN);
  private apiUrl = this.config?.apiUrl;

  fetchUser = () => this.http.get<User>(`${this.apiUrl}/user`);
}
