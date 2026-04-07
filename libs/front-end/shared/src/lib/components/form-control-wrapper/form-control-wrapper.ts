import { Component, computed, inject, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationErrorsService } from '../../services/validation-errors/validation-errors.service';

@Component({
  selector: 'lib-form-control-wrapper',
  imports: [],
  templateUrl: './form-control-wrapper.html',
  styleUrl: './form-control-wrapper.css',
})
export class FormControlWrapper {
  label = input(''); // for now label is only text
  id = input();
  touched = input(false);
  dirty = input(false);
  invalid = input(false);
  required = input(false);
  errors = input<ValidationErrors | null | undefined>({});
  helpText = input('');

  private _validationErrorService = inject(ValidationErrorsService);

  errosMessages = computed(() => {
    if (!this.invalid()) {
      return [];
    }
    return Object.entries(this.errors() || {})
      .filter((el) => !!el[1])
      .map(([key, value]) => ({
        key: `${this.id()}-${key}`,
        message: this._validationErrorService.getErrorValidationMessage(
          this.label() || 'This field',
          key,
          value,
        ),
      }));
  });
}
