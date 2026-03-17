import { inject, Injectable } from '@angular/core';

import { AiHouseService } from '../infrastructure/ai-house.service';
import { AIHouseBasic, AIHouse as AIHouseModel } from './ai-house.model';
import { BasicStore } from '@fe/shared';


@Injectable({ providedIn: 'root' })
export class AiHouseStore extends BasicStore<AIHouseBasic, AIHouseModel> {
  primaryIdKey = '_id';
  protected _apiService = inject(AiHouseService);
}
