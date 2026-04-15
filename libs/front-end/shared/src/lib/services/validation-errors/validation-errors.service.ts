import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

// sometimes validation error keys are in lowercase instead of camelCase, so we want to handle both cases
const VALIDATORS_KEY = {
  MIN: 'min',
  MAX: 'max',
  REQUIRED: 'required',
  REQUIRED_TRUE: 'requiredtrue', // Angular mostly uses 'requiredTrue'
  EMAIL: 'email',
  MIN_LENGTH: 'minlength', // Angular mostly uses 'minLength'
  MAX_LENGTH: 'maxlength', // Angular mostly uses 'maxLength'
  PATTERN: 'pattern',
  NULL_VALIDATOR: 'nullvalidator', // Angular mostly uses 'nullValidator'
  COMPOSE: 'compose',
  COMPOSE_ASYNC: 'composeasync', // Angular mostly uses 'composeAsync'
  INVALID_DATE: 'invaliddate', // This is custom and should be 'invalidDate' in camelCase, but we will handle both cases
  INVALID_YEAR: 'invalidyear', // This is custom and should be 'invalidYear' in camelCase, but we will handle both cases
};

// based on https://angular.dev/api/forms/Validators
// const defaultErrorsExample = {
//   [VALIDATORS_KEY.MIN]: { min: 3, actual: 2 },
//   [VALIDATORS_KEY.MAX]: { max: 3, actual: 4 },
//   [VALIDATORS_KEY.REQUIRED]: true,
//   [VALIDATORS_KEY.REQUIRED_TRUE]: true,
//   [VALIDATORS_KEY.EMAIL]: true,
//   [VALIDATORS_KEY.MIN_LENGTH]: { requiredLength: 3, actualLength: 2 },
//   [VALIDATORS_KEY.MAX_LENGTH]: { requiredLength: 3, actualLength: 4 },
//   [VALIDATORS_KEY.PATTERN]: {
//     requiredPattern: '^[a-zA-Z]+$',
//     actualValue: '123',
//   },
// };

export const PATTERNS = {
  HEX: {
    requiredPattern: /^#([0-9A-Fa-f]{3}){1,2}$/.toString(),
    message: ' is not a valid hex color (valid color should be like #ff0000)',
  },
  PHONE: {
    requiredPattern: /^\(\d{3}\) \d{2} \d{3} \d{4}$/.toString(),
    message:
      ' is not a valid phone number. It should be 12 digits and can include country code, for example: (123) 45 678 9012',
  },
};

const getPatternError = (
  label: string,
  error: { requiredPattern: string; actualValue: string },
) => {
  if (error.requiredPattern === PATTERNS.HEX.requiredPattern) {
    return `${label} ${PATTERNS.HEX.message}, but the actual value is ${error.actualValue}`;
  }
  if (error.requiredPattern === PATTERNS.PHONE.requiredPattern) {
    return `${label} ${PATTERNS.PHONE.message}, but the actual value is ${error.actualValue}`;
  }
  return `${label} is invalid.`;
};

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  [VALIDATORS_KEY.MIN]: (label, value?: { min: number; actual: number }) =>
    `${label} should be greater than or equal to ${value?.min}`,
  [VALIDATORS_KEY.MAX]: (label, value?: { max: number; actual: number }) =>
    `${label} should be less than or equal to ${value?.max}`,
  [VALIDATORS_KEY.REQUIRED]: (label: string) => `${label} is required`,
  [VALIDATORS_KEY.REQUIRED_TRUE]: (label: string) => `${label} must be true`,
  [VALIDATORS_KEY.EMAIL]: () => `This is not a valid email address`,
  [VALIDATORS_KEY.MIN_LENGTH]: (
    label,
    value?: { requiredLength: number; actualLength: number },
  ) => `${label} should be at least ${value?.requiredLength} characters`,
  [VALIDATORS_KEY.MAX_LENGTH]: (
    label,
    value?: { requiredLength: number; actualLength: number },
  ) => `${label} should be at most ${value?.requiredLength} characters`,
  [VALIDATORS_KEY.INVALID_DATE]: () => `This is not a valid date`,
  [VALIDATORS_KEY.INVALID_YEAR]: () =>
    `Date of Birth should be after year 1900`,
  [VALIDATORS_KEY.PATTERN]: getPatternError,
};

// to add error messages handler https://blog.bitsrc.io/effortlessly-show-validation-messages-in-angular-fbcf7bce8f4c
@Injectable({
  providedIn: 'root',
})
export class ValidationErrorsService {
  getErrorValidationMessages(
    errors: ValidationErrors,
    label = 'This field',
  ): string[] {
    return Object.entries(errors).map(([key, value]) =>
      this.getErrorValidationMessage(label, key, value),
    );
  }

  getErrorValidationMessage(label: string, key: string, error: any): string {
    const keyLowerCase = key.toLowerCase();
    if (
      typeof error === 'string' ||
      ERROR_MESSAGES[keyLowerCase] === undefined
    ) {
      return error;
    }
    return ERROR_MESSAGES[keyLowerCase](label, error);
  }
}
