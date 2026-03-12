import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { AiHouseStore } from '../../domain/ai-house.store';
import { AIHouse } from '../../domain/ai-house.model';

const USER_ID = "6877c9e33a5f97f4a86f9777";

@Component({
  selector: 'lib-ai-house-details',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './ai-house-details.html',
  styleUrl: './ai-house-details.css',
})
export class AiHouseDetails {
  aiHouseService = inject(AiHouseStore);
  private activatedRoute = inject(ActivatedRoute);
  data$ = this.activatedRoute.params.pipe(
    switchMap((params) => this.aiHouseService.getEntityByURL(params['id']))
  );

  isLoadingUpdate$ = this.activatedRoute.params.pipe(
    switchMap((params) => this.aiHouseService.getEntityByURL(params['id'])),
    switchMap(({ data }) => this.aiHouseService.getEntityById(data?._id || '')),
    map(({ isLoading }) => isLoading)
  );

  getAddress(address: any): string {
    const { street, city, state, zip, country } = address || {};
    return [street, city, state, zip, country]
      .filter(Boolean)
      .join(", ");
  }

  updateLikes(id: string, liked: boolean, house: AIHouse) {
    let newLikes: string[];
    const curLikes = house.likes || []
    if (liked) {
      newLikes = [...curLikes, USER_ID]
    } else {
      newLikes = curLikes.filter(userId => userId !== USER_ID);
    }
    this.aiHouseService.updateEntityPessimistic(id, { ...house, likes: newLikes });
  }
}
