import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { CustomButton } from '@fe/shared';
import { MenuDropdown } from '../menu-dropdown/menu-dropdown';
import { AuthStore } from '@fe/auth';

@Component({
  selector: 'lib-header-right',
  imports: [MenuDropdown, ButtonModule, CustomButton, AsyncPipe],
  templateUrl: './header-right.html',
  styleUrl: './header-right.css',
})
export class HeaderRight {
  private _authStore = inject(AuthStore);
  user$ = this._authStore.user$;

  showAuth = () => {
    this._authStore.showAuthModal();
  };
}
