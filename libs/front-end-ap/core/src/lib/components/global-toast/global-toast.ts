import { Component, effect, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GlobalToastService } from '@ap/shared';

@Component({
  selector: 'lib-global-toast',
  imports: [ToastModule],
  templateUrl: './global-toast.html',
  styleUrl: './global-toast.css',
  providers: [MessageService],
})
export class GlobalToast {
  private globalToastService = inject(GlobalToastService);
  private messageService = inject(MessageService);

  constructor() {
    effect(() => {
      const msg = this.globalToastService.message();
      if (msg) {
        this.messageService.add(msg);
      }
    });

    this.messageService.clearObserver
      .pipe(
        tap(() => this.globalToastService.clearMessage()),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
