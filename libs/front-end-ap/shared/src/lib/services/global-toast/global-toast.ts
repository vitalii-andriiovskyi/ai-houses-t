import { Injectable, signal } from '@angular/core';
import { ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class GlobalToastService {
  // data should be like
  // { severity: 'info', summary: 'Info', detail: 'Message Content' }
  private _message = signal<ToastMessageOptions | null>(null);
  message = this._message.asReadonly();

  setMessage(options: ToastMessageOptions) {
    this._message.set(options);
  }

  clearMessage() {
    this._message.set(null);
  }
}
