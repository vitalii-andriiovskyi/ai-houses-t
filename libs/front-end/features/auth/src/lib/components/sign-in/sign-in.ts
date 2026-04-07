import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CustomButton, FormControlWrapper } from '@fe/shared';

import { AuthStore } from '../../domain/auth.store';

@Component({
  selector: 'lib-sign-in',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FormControlWrapper,
    CustomButton,
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private formBuilder = inject(FormBuilder);
  private _authStore = inject(AuthStore);
  error = this._authStore.error;
  isLoading = this._authStore.isLoading;

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    const { email, password } = this.signInForm.value;
    if (email && password) {
      this._authStore.signIn(email, password);
    }
  }
}
