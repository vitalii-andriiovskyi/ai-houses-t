/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { VehicleApi } from './vehicle.api';
import {
  Vehicle,
  VehicleBasic,
  VehicleCreate,
  VehicleUpdate,
} from '../domain/vehicle.model';
import { filterQueryParams, Pagination } from '@shared';
import { BasicApiService } from '@fe/shared';

@Injectable({
  providedIn: 'root',
})
export class VehicleService implements BasicApiService<VehicleBasic, Vehicle> {
  private _vehicleApi = inject(VehicleApi);

  fetchMany(params?: object) {
    const { pageSize, ...restParams } = params || ({} as any);
    const filteredParams = filterQueryParams({
      ...restParams,
      limit: pageSize,
    });
    return this._vehicleApi.getVehicles(filteredParams as HttpParams).pipe(
      map((response: Pagination<Vehicle>) => ({
        data: response.items,
        page: response.meta.currentPage,
        pageSize: response.meta.itemsPerPage,
        total: response.meta.totalItems || pageSize,
      })),
    );
  }

  fetchOne(id: string, params?: object): Observable<Vehicle> {
    const filteredParams = filterQueryParams(params || {});
    return this._vehicleApi.getVehicleById(id, filteredParams as HttpParams);
  }

  createOne(data: VehicleCreate): Observable<Vehicle> {
    return this._vehicleApi.createVehicle(data);
  }

  updateOne(id: string, data: VehicleUpdate): Observable<Vehicle> {
    return this._vehicleApi.updateVehicle(id, data);
  }

  deleteOne(id: string) {
    return this._vehicleApi.deleteVehicle(id);
  }
}
