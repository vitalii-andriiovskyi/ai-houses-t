import { Component, inject } from '@angular/core';
import { BehaviorSubject, map, switchMap, zip } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { last, range } from 'lodash-es';

import { VehicleStore } from '../../domain/vehicle.store';
import { CustomButton } from '@fe/shared';
import { VehiclePreview } from '../vehicle-preview/vehicle-preview';
import { VehicleBasic } from '@shared';

@Component({
  selector: 'lib-vehicles',
  standalone: true,
  imports: [VehiclePreview, CustomButton],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles {
  private vehicleStore = inject(VehicleStore);

  state$ = this.vehicleStore.state$;

  currentPage$ = this.state$.pipe(map((state) => state.page));
  currentPage = toSignal(this.currentPage$);

  total$ = this.state$.pipe(map((state) => state.total));
  total = toSignal(this.total$);

  pageSize$ = this.state$.pipe(map((state) => state.pageSize));
  pageSize = toSignal(this.pageSize$);

  private _nextPage = new BehaviorSubject<number>(1);
  nextPage$ = this._nextPage.asObservable();

  vehicles$ = this.nextPage$.pipe(
    switchMap((nextPage) => {
      const obs = range(1, nextPage + 1).map((page) =>
        this.vehicleStore.getEntities({
          page,
          pageSize: this.pageSize(),
        }),
      );
      return zip(obs);
    }),
    map((results) => {
      const allData = results
        .flatMap((result) => result.data)
        .filter(Boolean) as VehicleBasic[];
      const lastResult = last(results);
      const isLoading = lastResult?.isLoading || false;
      const error = lastResult?.error || null;
      return {
        data: allData,
        isLoading,
        error,
      };
    }),
  );
  vehicles = toSignal(this.vehicles$);

  loadMore() {
    const total = this.total() || 0;
    const curTotal = this.vehicles()?.data?.length || 0;
    if (curTotal >= total) {
      return;
    }

    const currentPage = this.currentPage() as number;
    this._nextPage.next(currentPage + 1);
  }
}
