import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { map, merge, Subscription, tap } from 'rxjs';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';

import { FormControlWrapper } from '@fe/shared';

@Component({
  selector: 'lib-color-picker',
  imports: [
    ReactiveFormsModule,
    FormControlWrapper,
    ColorPickerModule,
    InputTextModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ColorPicker,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ColorPicker,
    },
  ],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.css',
})
export class ColorPicker
  implements ControlValueAccessor, Validator, OnInit, OnDestroy
{
  nameStart = input.required<string>();
  legend = input<string>('');
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    hex: ['', [Validators.pattern(/^#([0-9A-Fa-f]{3}){1,2}$/)]],
    color: [''],
  });

  get hex() {
    return this.form.get('hex');
  }
  get color() {
    return this.form.get('color');
  }
  hex$ = this.hex?.valueChanges.pipe(
    tap((value) => {
      if (value && this.hex?.valid) {
        this.color?.setValue(value, { emitEvent: false });
      }
    }),
  );
  color$ = this.color?.valueChanges.pipe(
    tap((value) => {
      if (value) {
        this.hex?.setValue(value, { emitEvent: false });
      }
    }),
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  onChangeSubs: Subscription[] = [];

  getFieldId(fieldName: string) {
    return `${this.nameStart()}.${fieldName}`;
  }

  ngOnInit() {
    const obs = [this.hex$, this.color$].filter((obs) => !!obs);
    const fieldsSub = merge(...obs).subscribe();
    this.onChangeSubs.push(fieldsSub);
  }

  ngOnDestroy() {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  // ************* ControlValueAccessor implementation *************
  registerOnChange(onChange: any) {
    const sub = this.form.valueChanges
      .pipe(map((value: any) => this.defineColor(value)))
      .subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  defineColor({ hex, color }: { hex: string; color: string }) {
    // if hex is valid use it to set color, otherwise use color value
    let result = '';
    if (hex && this.hex?.valid) {
      // this.color?.setValue(hex);
      result = hex;
    } else if (color) {
      // this.hex?.setValue(color);
      result = color;
    }
    return result;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched; // then use onTouched on every control for (blur) event
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.color?.setValue(value, { emitEvent: false });
    }
  }

  // ************* Validator implementation *************
  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }

    // const errors: ValidationErrors = this.getControlErrors('color'); // color is the main control.
    const errors: ValidationErrors = Object.keys(this.form.controls).reduce(
      (acc, key: string) => ({
        ...acc,
        ...this.getControlErrors(key),
      }),
      {},
    );

    return errors;
  }

  getControlErrors(controlName: string) {
    const controlErrors = this.form.get(controlName)?.errors;

    if (controlErrors) {
      return { [controlName]: controlErrors };
    }

    return {};
  }
}
