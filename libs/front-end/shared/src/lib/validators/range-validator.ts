/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function rangeValidator(
  [min, max]: [number, number] = [0, 100],
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const [minValue, maxValue] = (control.value || []).sort(
      (a: number, b: number) => a - b,
    );
    if (minValue < min || minValue > max || maxValue < min || maxValue > max) {
      return { range: true };
    }
    return null;
  };
}
