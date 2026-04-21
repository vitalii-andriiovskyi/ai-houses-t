import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AIHouseBasic } from '../../domain/ai-house.model';
import { User } from '@fe/user';
import { CustomButton } from '@fe/shared';

@Component({
  selector: 'lib-ai-house-card',
  imports: [RouterModule, ButtonModule, CustomButton],
  templateUrl: './ai-house-card.html',
  styleUrl: './ai-house-card.css',
})
export class AiHouseCard {
  like = input<(data: AIHouseBasic | undefined) => void>();
  unlike = input<(data: AIHouseBasic | undefined) => void>();
  user = input<User | null>();
  data = input<AIHouseBasic>();
  firstImage = computed(() => this.data()?.seo?.image); // it should be preview image, but for now we can use seo image as a placeholder
  address = computed(() => {
    const { address1, city, state, zip, country } = this.data()?.address || {};
    return [address1, city, state, zip, country].filter(Boolean).join(', ');
  });
  isLiked = computed(() => {
    const userId = this.user()?.id;
    const likes = this.data()?.likes || [];
    return likes.some((like) => like.id === userId);
  });
}
