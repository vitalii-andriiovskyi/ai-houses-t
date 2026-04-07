import { inject, Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';

import { UserService } from '../infrastructure/user.service';
import { User } from './user.model';
import { BasicStore } from '@fe/shared';

const USER_KEY = 'me';

@Injectable({ providedIn: 'root' })
export class UserStore extends BasicStore<User, User> {
  primaryIdKey = 'id';
  protected _apiService = inject(UserService);

  userState$ = this.getEntityByURL(USER_KEY).pipe(shareReplay(1));
  user$ = this.userState$.pipe(map((state) => state?.data));
  refetchUser() {
    return this.fetchEntityById(USER_KEY, true); // do not forget to subscribe to this method to trigger the refetching process
  }

  clearUser() {
    this.clearEntityInStore(USER_KEY);
  }
}
