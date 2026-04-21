/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { AiHouseApi } from './ai-house.api';
import {
  AIHouse,
  AIHouseBasic,
  AIHouseCreate,
  AIHouseUpdate,
} from '../domain/ai-house.model';
import { filterQueryParams, Pagination } from '@shared';
import { BasicApiService } from '@fe/shared';

@Injectable({
  providedIn: 'root',
})
export class AiHouseService implements BasicApiService<AIHouseBasic, AIHouse> {
  private _aiHouseApi = inject(AiHouseApi);

  fetchMany(params?: object) {
    const { pageSize, ...restParams } = params || ({} as any);
    const filteredParams = filterQueryParams({
      ...restParams,
      limit: pageSize,
    });
    return this._aiHouseApi.getAIHouses(filteredParams as HttpParams).pipe(
      map((response: Pagination<AIHouse>) => ({
        data: response.items,
        page: response.meta.currentPage,
        pageSize: response.meta.itemsPerPage,
        total: response.meta.totalItems || pageSize,
      })),
    );
  }
  fetchOne(id: string, params?: object): Observable<AIHouse> {
    const filteredParams = filterQueryParams(params || {});
    return this._aiHouseApi.getAIHouseById(id, filteredParams as HttpParams);
  }

  createOne(data: AIHouseCreate): Observable<AIHouse> {
    return this._aiHouseApi.createAIHouse(data);
  }

  updateOne(id: string, data: AIHouseUpdate): Observable<AIHouse> {
    return this._aiHouseApi.updateAIHouse(id, data);
  }

  deleteOne(id: string) {
    return this._aiHouseApi.deleteAIHouse(id);
  }

  likeOne(id: string): Observable<AIHouse> {
    return this._aiHouseApi.likeAIHouse(id);
  }

  unlikeOne(id: string): Observable<AIHouse> {
    return this._aiHouseApi.unlikeAIHouse(id);
  }
}
