import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { AiHouseApi } from './ai-house.api';
import { AIHouse, AIHouseCreate, AIHouseUpdate } from '../domain/ai-house.model';
import { chain } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class AiHouseService {
  private _aiHouseApi = inject(AiHouseApi);

  fetchMany(params?: object): Observable<any> {
    return this._aiHouseApi.getAIHouses().pipe( // to add params later
      map((response) => ({ data: response, page: 1, pageSize: 10, total: 10 })) // to change it later. for now just to make it work
    );
  };
  fetchOne(id: string, params?: object): Observable<AIHouse> {
    const filteredParams = chain(params)
      .pickBy(value => value !== undefined && value !== null && value !== '')
      .mapValues(String)
      .value();
    return this._aiHouseApi.getAIHouseById(id, filteredParams as HttpParams);
  };

  createOne(data: AIHouseCreate): Observable<AIHouse> {
    return this._aiHouseApi.createAIHouse(data);
  };

  updateOne(id: string, data: AIHouseUpdate): Observable<AIHouse> {
    return this._aiHouseApi.updateAIHouse(id, data);
  };

  deleteOne(id: string) {
    return this._aiHouseApi.deleteAIHouse(id);
  };

  likeOne(id: string): Observable<AIHouse> {
    return this._aiHouseApi.likeAIHouse(id);
  };

  unlikeOne(id: string): Observable<AIHouse> {
    return this._aiHouseApi.unlikeAIHouse(id);
  };
}
