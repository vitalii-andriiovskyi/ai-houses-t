import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthStore } from '@fe/auth';
import { CustomButton } from '@fe/shared';
@Component({
  selector: 'lib-header',
  imports: [AsyncPipe, CustomButton, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private _router = inject(Router);
  private _authStore = inject(AuthStore);
  user$ = this._authStore.user$;

  signOut() {
    this._authStore.signOut();
    this._router.navigate(['/sign-in']);
  }
}
