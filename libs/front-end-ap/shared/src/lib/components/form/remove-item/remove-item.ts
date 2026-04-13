import { Component, inject, input } from '@angular/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'lib-remove-item',
  imports: [ConfirmPopupModule, ButtonModule, TooltipModule],
  providers: [ConfirmationService],
  templateUrl: './remove-item.html',
  styleUrl: './remove-item.css',
})
export class RemoveItem {
  tooltipText = input('Remove Item');
  fn = input(() => {
    return;
  });

  private confirmationService = inject(ConfirmationService);

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: `Are you sure you want to remove it?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const removeFn = this.fn();
        if (removeFn) {
          removeFn();
        }
      },
      // rejectButtonProps: {
      //   label: 'Cancel',
      //   severity: 'secondary',
      //   outlined: true,
      // },
      // acceptButtonProps: {
      //   label: 'Delete',
      //   severity: 'danger',
      // },
    });
  }
}
