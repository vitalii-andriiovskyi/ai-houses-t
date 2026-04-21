import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserApi } from './user.api';
import { User } from '../domain/user.model';
import { BasicApiService } from '@fe/shared';

@Injectable({
  providedIn: 'root',
})
export class UserService implements BasicApiService<User, User> {
  private _userApi = inject(UserApi);

  fetchOne(id: string, options?: { isURL?: boolean | null }): Observable<User> {
    // in this case I don't use id and options, because user data are in JWT token.
    // You can add transformation logic here if needed
    return this._userApi.fetchUser();
  }

  fetchMany(params: object): Observable<{
    data: User[];
    page: number;
    pageSize: number;
    total: number;
  }> {
    throw new Error('Method not implemented.');
  }

  updateOne(id: string, data: Partial<User>): Observable<User> {
    throw new Error('Method not implemented.');
  }

  deleteOne(): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
