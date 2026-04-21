import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

const PSW_STRENGTH_VALIDATION_ERRORS: ValidationErrors = {
  HAS_UPPER_CASE: 'Password must contain at least one uppercase letter',
  HAS_LOWER_CASE: 'Password must contain at least one lowercase letter',
  HAS_NUMBER: 'Password must contain at least one number',
  HAS_SPECIAL: 'Password must contain at least one special character (@$!%*?&)',
};

export function passwordStrengthValidator(
  errMessages: ValidationErrors = PSW_STRENGTH_VALIDATION_ERRORS,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const hasSpecial = /[@$!%*?&]+/.test(value);

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

    const validationErrors: ValidationErrors = {
      ...(!hasUpperCase && { hasUpperCase: errMessages['HAS_UPPER_CASE'] }),
      ...(!hasLowerCase && { hasLowerCase: errMessages['HAS_LOWER_CASE'] }),
      ...(!hasNumeric && { hasNumber: errMessages['HAS_NUMBER'] }),
      ...(!hasSpecial && { hasSpecial: errMessages['HAS_SPECIAL'] }),
    };
    return !passwordValid ? validationErrors : null;
  };
}
