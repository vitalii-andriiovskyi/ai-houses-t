import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PASSWORD_KEY = 'password';
const CONFIRM_PASSWORD_KEY = 'confirmPassword';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
  keys = { password: PASSWORD_KEY, confirmPassword: CONFIRM_PASSWORD_KEY },
): ValidationErrors | null => {
  const password = control.get(keys.password)?.value;
  const confirmPassword = control.get(keys.confirmPassword)?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  if (password !== confirmPassword) {
    control.get(keys.confirmPassword)?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    control.get(keys.confirmPassword)?.setErrors(null);
    return null;
  }
};

export const validationErrorMessages: ValidationErrors = {
  passwordMismatch: 'Passwords do not match',
};
