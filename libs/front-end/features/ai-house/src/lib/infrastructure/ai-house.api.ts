import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import type { AIHouse, AIHouseCreate, AIHouseUpdate } from '../domain/ai-house.model';

const API_URL = 'http://localhost:3000/api'; // this has to be injected via CONFIG.API_URL token, but for simplicity, we will hardcode it here

@Injectable({
  providedIn: 'root',
})
export class AiHouseApi {
  private http = inject(HttpClient);

  getAIHouses = () => this.http.get<AIHouse[]>(`${API_URL}/ai-houses`);
  getAIHouseById = (id: string, params?: HttpParams) => this.http.get<AIHouse>(`${API_URL}/ai-houses/${id}`, { params });
  createAIHouse = (data: AIHouseCreate) => this.http.post<AIHouse>(`${API_URL}/ai-houses`, data);
  updateAIHouse = (id: string, data: AIHouseUpdate) => this.http.put<AIHouse>(`${API_URL}/ai-houses/${id}`, data);
  deleteAIHouse = (id: string) => this.http.delete(`${API_URL}/ai-houses/${id}`);
  likeAIHouse = (id: string) => this.http.post<AIHouse>(`${API_URL}/ai-houses/${id}/like`, null);
  unlikeAIHouse = (id: string) => this.http.post<AIHouse>(`${API_URL}/ai-houses/${id}/unlike`, null);
}
