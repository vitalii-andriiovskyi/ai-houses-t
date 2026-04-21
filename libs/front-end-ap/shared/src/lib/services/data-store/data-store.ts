import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { chain } from 'lodash-es';
import { catchError, of, tap } from 'rxjs';

import { APP_CONFIG_TOKEN } from '@fe/shared';
import { GlobalToastService } from '../global-toast/global-toast';
import { Pagination } from '@shared';

const ADMIN_URL = 'admin';

export class DataStore<T> {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG_TOKEN);
  private apiUrl = this.config?.apiUrl;
  private globalToast = inject(GlobalToastService);

  private _data = signal<Pagination<T> | T | null>(null);
  data = this._data.asReadonly();

  load(url: string, params: object = {}) {
    const filteredParams = chain(params)
      .pickBy((value) => value !== undefined && value !== null && value !== '')
      .mapValues(String)
      .value();
    return this.http
      .get<Pagination<T> | T>(`${this.apiUrl}/${ADMIN_URL}/${url}`, {
        params: filteredParams as HttpParams,
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this._data.set(res);
        }),
        catchError((error) => {
          const errMsg = this.getErrorMsg(error);
          this.globalToast.setMessage({
            severity: 'error',
            summary: 'Error',
            detail: errMsg,
            life: 3000,
          });
          return of(null);
        }),
      );
  }

  create(url: string, data: object = {}) {
    return this.http
      .post<T>(`${this.apiUrl}/${ADMIN_URL}/${url}`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this._data.set(res);
          this.globalToast.setMessage({
            severity: 'success',
            summary: 'Success',
            detail: 'Data is saved',
            life: 1000,
          });
        }),
        catchError((error) => {
          const errMsg = this.getErrorMsg(error);
          this.globalToast.setMessage({
            severity: 'error',
            summary: 'Error',
            detail: errMsg,
            life: 3000,
          });
          return of(null);
        }),
      );
  }

  update(url: string, data: object = {}) {
    return this.http
      .put<T>(`${this.apiUrl}/${ADMIN_URL}/${url}`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          if (res) {
            this._data.set(res);
          }
          this.globalToast.setMessage({
            severity: 'success',
            summary: 'Success',
            detail: 'Data is updated',
            life: 1000,
          });
        }),
        catchError((error) => {
          const errMsg = this.getErrorMsg(error);
          this.globalToast.setMessage({
            severity: 'error',
            summary: 'Error',
            detail: errMsg,
            life: 3000,
          });
          return of(null);
        }),
      );
  }

  patch(url: string, data: object = {}) {
    return this.http
      .patch<T>(`${this.apiUrl}/${ADMIN_URL}/${url}`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          if (res) {
            this._data.set(res);
          }
          this.globalToast.setMessage({
            severity: 'success',
            summary: 'Success',
            detail: 'Data is patched',
            life: 1000,
          });
        }),
        catchError((error) => {
          const errMsg = this.getErrorMsg(error);
          this.globalToast.setMessage({
            severity: 'error',
            summary: 'Error',
            detail: errMsg,
            life: 3000,
          });
          return of(null);
        }),
      );
  }

  remove(url: string) {
    return this.http
      .delete(`${this.apiUrl}/${ADMIN_URL}/${url}`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this._data.set(null);
          this.globalToast.setMessage({
            severity: 'success',
            summary: 'Success',
            detail: 'Data is removed',
            life: 1000,
          });
        }),
        catchError((error) => {
          const errMsg = this.getErrorMsg(error);
          this.globalToast.setMessage({
            severity: 'error',
            summary: 'Error',
            detail: errMsg,
            life: 3000,
          });
          return of(null);
        }),
      );
  }

  private getErrorMsg(error: any): string {
    console.error('API Error:', error);

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return `Client-side error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'object') {
      // Server-side error with JSON response
      return `${error.error.message || error.message || 'Unknown server error'}`;
    } else {
      // Other types of errors
      return `Unexpected error: ${error.message || 'Unknown error'}`;
    }
  }
}
