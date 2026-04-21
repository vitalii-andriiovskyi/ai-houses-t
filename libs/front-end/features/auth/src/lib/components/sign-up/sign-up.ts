import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, delay, of, tap } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthStore } from '../../domain/auth.store';
import {
  CustomButton,
  FormControlWrapper,
  passwordMatchValidator,
  passwordStrengthValidator,
  validationErrorMessages,
} from '@fe/shared';
import { UserSignUp } from '@shared';

@Component({
  selector: 'lib-sign-up',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FormControlWrapper,
    CustomButton,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private _authStore = inject(AuthStore);
  private formBuilder = inject(FormBuilder);
  protected isSubmitting = signal(false);
  protected error = signal<string | null>(null);

  signUpForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          passwordStrengthValidator(),
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: passwordMatchValidator,
    },
  );

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  getErrorsForConfirmPassword() {
    return {
      ...(this.confirmPassword?.errors || {}),
      ...(this.signUpForm.errors?.['passwordMismatch']
        ? { passwordMismatch: validationErrorMessages['passwordMismatch'] }
        : {}),
    };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isSubmitting.set(true);
      this._authStore
        .signUp(this.signUpForm.value as UserSignUp)
        .pipe(
          tap(() => {
            this.isSubmitting.set(false);
            this._authStore.hideAuthModal();
          }),
          catchError((err) => {
            this.isSubmitting.set(false);
            console.log('error', err);
            this.error.set(err?.error?.message || 'Something went wrong');
            return of(null).pipe(
              delay(5000),
              tap(() => this.error.set(null)),
            );
          }),
        )
        .subscribe();
    }
  }
}
