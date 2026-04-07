import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { LOCAL_STORAGE_TOKEN } from '../../tokens/local-storage.token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  private _storage = inject(LOCAL_STORAGE_TOKEN);
  readonly enabled = isPlatformBrowser(inject(PLATFORM_ID));

  get length() {
    return this._storage.length;
  }

  clear() {
    this._storage.clear();
  }
  getItem(key: string) {
    return this._storage.getItem(key);
  }
  key(index: number) {
    return this._storage.key(index);
  }
  removeItem(key: string): void {
    this._storage.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this._storage.setItem(key, value);
  }
}
