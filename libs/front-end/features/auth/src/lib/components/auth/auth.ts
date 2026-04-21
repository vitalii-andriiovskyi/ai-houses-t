import {
  Component,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { AuthStore } from '../../domain/auth.store';
import { SignIn } from '../sign-in/sign-in';
import { SignUp } from '../sign-up/sign-up';
import { CustomButton } from '@fe/shared';

@Component({
  selector: 'lib-auth',
  imports: [SignIn, SignUp, CustomButton, ButtonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLogin = signal(true);
  private _authStore = inject(AuthStore);
  isVisible = this._authStore.isAuthVisible;
  hideAuth = () => this._authStore.hideAuthModal();

  private platformId = inject(PLATFORM_ID);

  dialogEl = viewChild<ElementRef>('dialogEl');

  constructor() {
    effect(() => {
      const isVisible = this.isVisible();
      if (
        this.dialogEl()?.nativeElement &&
        isPlatformBrowser(this.platformId)
      ) {
        if (isVisible) {
          this.dialogEl()?.nativeElement?.showModal();
        } else {
          this.dialogEl()?.nativeElement?.close();
        }
      }
    });
  }

  showSignIn() {
    this.isLogin.set(true);
  }

  showSignUp() {
    this.isLogin.set(false);
  }
}
