import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import type {
  AIHouse,
  AIHouseCreate,
  AIHouseUpdate,
} from '../domain/ai-house.model';
import { Pagination } from '@shared';
import { APP_CONFIG_TOKEN } from '@fe/shared';

@Injectable({
  providedIn: 'root',
})
export class AiHouseApi {
  private http = inject(HttpClient);
  private apiUrl = inject(APP_CONFIG_TOKEN).apiUrl;

  getAIHouses = (params?: HttpParams) =>
    this.http.get<Pagination<AIHouse>>(`${this.apiUrl}/ai-houses`, { params });
  getAIHouseById = (id: string, params?: HttpParams) =>
    this.http.get<AIHouse>(`${this.apiUrl}/ai-houses/${id}`, { params });
  createAIHouse = (data: AIHouseCreate) =>
    this.http.post<AIHouse>(`${this.apiUrl}/ai-houses`, data);
  updateAIHouse = (id: string, data: AIHouseUpdate) =>
    this.http.put<AIHouse>(`${this.apiUrl}/ai-houses/${id}`, data);
  deleteAIHouse = (id: string) =>
    this.http.delete(`${this.apiUrl}/ai-houses/${id}`);
  likeAIHouse = (id: string) =>
    this.http.post<AIHouse>(`${this.apiUrl}/ai-houses/${id}/like`, null);
  unlikeAIHouse = (id: string) =>
    this.http.post<AIHouse>(`${this.apiUrl}/ai-houses/${id}/unlike`, null);
}
