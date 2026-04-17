import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AiHouseStore } from '../../domain/ai-house.store';
import { AIHouse } from '../../domain/ai-house.model';
import { AuthStore } from '@fe/auth';
import { ActionStatus, CustomButton } from '@fe/shared';

@Component({
  selector: 'lib-ai-house-details',
  imports: [CommonModule, CustomButton],
  templateUrl: './ai-house-details.html',
  styleUrl: './ai-house-details.css',
})
export class AiHouseDetails {
  private authStore = inject(AuthStore);
  private aiHouseService = inject(AiHouseStore);

  data = input<ActionStatus<AIHouse> | null>();

  user$ = this.authStore.user$;
  user = toSignal(this.user$);
  isLiked = computed(() => {
    const userId = this.user()?.id;
    const likes = this.data()?.data?.likes || [];
    return likes.some((like) => like.id === userId);
  });

  getAddress(address: any): string {
    const { street, city, state, zip, country } = address || {};
    return [street, city, state, zip, country].filter(Boolean).join(', ');
  }

  like = () => {
    this.aiHouseService.likeOne(this.data()?.data);
  };
  unlike = () => {
    this.aiHouseService.unlikeOne(this.data()?.data);
  };
}
