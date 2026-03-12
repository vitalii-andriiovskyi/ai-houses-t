import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { AiHouseStore } from '../../domain/ai-house.store';
import { AiHouseCard } from '../ai-house-card/ai-house-card';
import { AIHouse } from '../../domain/ai-house.model';


@Component({
  selector: 'lib-ai-house',
  imports: [AsyncPipe, AiHouseCard],
  templateUrl: './ai-houses.html',
  styleUrl: './ai-houses.css',
})
export class AiHouses {
  aiHouseService = inject(AiHouseStore);
  aiHouses$ = this.aiHouseService.getEntities();
  removeHouse = (id: string) => {
    // this.aiHouseService.removeEntityPessimistic(id);
    this.aiHouseService.removeEntityOptimistic(id);
  }
}
