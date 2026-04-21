import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import type {
  Vehicle,
  VehicleCreate,
  VehicleUpdate,
} from '../domain/vehicle.model';
import { Pagination } from '@shared';
import { APP_CONFIG_TOKEN } from '@fe/shared';

@Injectable({
  providedIn: 'root',
})
export class VehicleApi {
  private http = inject(HttpClient);
  private apiUrl = inject(APP_CONFIG_TOKEN).apiUrl;
  private featureUrl = `${this.apiUrl}/vehicles`;

  getVehicles = (params?: HttpParams) =>
    this.http.get<Pagination<Vehicle>>(this.featureUrl, { params });
  getVehicleById = (id: string, params?: HttpParams) =>
    this.http.get<Vehicle>(`${this.featureUrl}/${id}`, { params });
  createVehicle = (data: VehicleCreate) =>
    this.http.post<Vehicle>(this.featureUrl, data);
  updateVehicle = (id: string, data: VehicleUpdate) =>
    this.http.put<Vehicle>(`${this.featureUrl}/${id}`, data);
  deleteVehicle = (id: string) => this.http.delete(`${this.featureUrl}/${id}`);
}
