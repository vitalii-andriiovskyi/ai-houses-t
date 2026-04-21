import { Component, inject } from '@angular/core';
import { BehaviorSubject, map, switchMap, zip } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { last, range } from 'lodash-es';

import { AiHouseStore } from '../../domain/ai-house.store';
import { CustomButton } from '@fe/shared';
import { AiHouseCard } from '../ai-house-card/ai-house-card';
import { AIHouseBasic } from '@shared';
import { AuthStore } from '@fe/auth';

@Component({
  selector: 'lib-ai-houses',
  imports: [AiHouseCard, CustomButton],
  templateUrl: './ai-houses.html',
  styleUrl: './ai-houses.css',
})
export class AiHouses {
  private authStore = inject(AuthStore);
  private aiHouseService = inject(AiHouseStore);

  user$ = this.authStore.user$;
  user = toSignal(this.user$);

  state$ = this.aiHouseService.state$;

  currentPage$ = this.state$.pipe(map((state) => state.page));
  currentPage = toSignal(this.currentPage$);

  total$ = this.state$.pipe(map((state) => state.total));
  total = toSignal(this.total$);

  pageSize$ = this.state$.pipe(map((state) => state.pageSize));
  pageSize = toSignal(this.pageSize$);

  private _nextPage = new BehaviorSubject<number>(1);
  nextPage$ = this._nextPage.asObservable();

  aiHouses$ = this.nextPage$.pipe(
    switchMap((nextPage) => {
      // [1, 2, 3] => [obs1 ({page: 1}), obs2 ({page: 2}), obs3 ({page: 3})] => zip(obs1, obs2, obs3) => [data1, data2, data3]
      const obs = range(1, nextPage + 1).map((page) =>
        this.aiHouseService.getEntities({
          page,
          pageSize: this.pageSize(),
        }),
      );
      return zip(obs);
    }),
    map((results) => {
      const allData = results
        .flatMap((result) => result.data)
        .filter(Boolean) as AIHouseBasic[];
      const lastResult = last(results);
      const isLoading = lastResult?.isLoading || false;
      const error = lastResult?.error || null;
      // const isLoading = results.some((result) => result.isLoading);
      // const error = results.find((result) => result.error)?.error || null;
      return {
        data: allData,
        isLoading,
        error,
      };
    }),
  );
  aiHouses = toSignal(this.aiHouses$);

  loadMore() {
    const total = this.total() || 0;
    const curTotal = this.aiHouses()?.data?.length || 0;
    if (curTotal >= total) {
      return;
    }

    const currentPage = this.currentPage() as number;
    this._nextPage.next(currentPage + 1);
  }

  removeHouse = (id: string) => {
    // this.aiHouseService.removeEntityPessimistic(id);
    this.aiHouseService.removeEntityOptimistic(id);
  };
  likeHouse = (data: AIHouseBasic | undefined) => {
    this.aiHouseService.likeOne(data);
  };
  unlikeHouse = (data: AIHouseBasic | undefined) => {
    this.aiHouseService.unlikeOne(data);
  };
}
