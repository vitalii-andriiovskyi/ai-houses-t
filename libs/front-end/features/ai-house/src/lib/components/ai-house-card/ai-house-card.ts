import { Component, computed, inject, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';


import { AIHouseBasic, } from '../../domain/ai-house.model';
import { AiHouseStore } from '../../domain/ai-house.store';

@Component({
  selector: 'lib-ai-house-card',
  imports: [RouterModule, ButtonModule],
  templateUrl: './ai-house-card.html',
  styleUrl: './ai-house-card.css',
})
export class AiHouseCard {
  houseStore = inject(AiHouseStore);
  @Input() removeMe!: (id: string) => void;
  data = input<AIHouseBasic>();
  firstImage = computed(() => this.data()?.images[0]);
  address = computed(() => {
    const { street, city, state, zip, country } = this.data()?.address || {};
    return [street, city, state, zip, country]
      .filter(Boolean)
      .join(", ");
  });
}
