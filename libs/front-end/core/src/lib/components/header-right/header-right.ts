import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CustomButton } from "@fe/shared";
import { MenuDropdown } from '../menu-dropdown/menu-dropdown';

@Component({
  selector: 'lib-header-right',
  imports: [MenuDropdown, ButtonModule, CustomButton],
  templateUrl: './header-right.html',
  styleUrl: './header-right.css',
})
export class HeaderRight {
  user = signal(false); // TODO: replace with actual user data

  showAuth = () => {
    // this.authService.showAuthModal();
  }
}
