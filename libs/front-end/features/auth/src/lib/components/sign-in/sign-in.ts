import { Component, inject, input, output, signal } from '@angular/core';
import { catchError, of, delay, tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CustomButton, FormControlWrapper } from '@fe/shared';

import { AuthStore } from '../../domain/auth.store';
import { Role } from '@shared';

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
  role = input<Role>();
  signin = output<boolean>();
  private formBuilder = inject(FormBuilder);
  private _authStore = inject(AuthStore);
  protected error = signal('');
  protected isLoading = signal(false);

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
      this.isLoading.set(true);
      this.error.set('');
      this._authStore
        .signIn(email, password, this.role())
        .pipe(
          tap(() => {
            this.isLoading.set(false);
            this.signin.emit(true);
          }),
          catchError((err) => {
            this.error.set(err.error?.message || 'Invalid email or password.');
            this.isLoading.set(false);
            return of(err).pipe(
              delay(5000),
              tap(() => {
                this.error.set('');
              }),
            );
          }),
        )
        .subscribe();
    }
  }
}
