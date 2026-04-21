import { inject, Injectable } from '@angular/core';
import { filter, tap } from 'rxjs';

import { AiHouseService } from '../infrastructure/ai-house.service';
import { AIHouseBasic, AIHouse as AIHouseModel } from './ai-house.model';
import { BasicStore } from '@fe/shared';
import { AuthStore } from '@fe/auth';
import { User } from '@shared';

@Injectable({ providedIn: 'root' })
export class AiHouseStore extends BasicStore<AIHouseBasic, AIHouseModel> {
  primaryIdKey = 'id';
  protected _apiService = inject(AiHouseService);
  private authStore = inject(AuthStore);

  likeOne(el?: AIHouseBasic | null) {
    if (!el) return;
    this.authStore.user$
      .pipe(
        filter((user) => !!user), // Ensure user is authenticated
        filter((user) => !!el.owner?.id && user?.id !== el.owner?.id), // Ensure user is not the owner
        filter((user) => !el.likes?.some((like) => like.id === user.id)), // Ensure user has not already liked
        tap((user) => {
          const newEl: Partial<AIHouseBasic> = {
            likesCount: (el.likesCount || 0) + 1,
            likes: [...(el.likes || []), { id: user.id } as User],
          };
          this.updateEntityOptimistic(el.id, newEl, (id, _) =>
            this._apiService.likeOne(id),
          );
        }),
      )
      .subscribe();
  }

  unlikeOne(el?: AIHouseBasic | null) {
    if (!el) return;
    this.authStore.user$
      .pipe(
        filter((user) => !!user), // Ensure user is authenticated
        filter((user) => !!el.owner?.id && user?.id !== el.owner?.id), // Ensure user is not the owner
        filter((user) => (el.likes || []).some((like) => like.id === user.id)), // Ensure user has already liked
        tap((user) => {
          const newEl: Partial<AIHouseBasic> = {
            likesCount: Math.max((el.likesCount || 1) - 1, 0),
            likes: (el.likes || []).filter((like) => like.id !== user.id),
          };
          this.updateEntityOptimistic(el.id, newEl, (id, _) =>
            this._apiService.unlikeOne(id),
          );
        }),
      )
      .subscribe();
  }
}
