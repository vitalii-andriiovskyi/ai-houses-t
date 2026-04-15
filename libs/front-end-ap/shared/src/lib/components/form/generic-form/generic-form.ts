import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';

import {
  CustomButton,
  FormControlWrapper,
  getDefaultImage,
  passwordMatchValidator,
  passwordStrengthValidator,
  rangeValidator,
  validationErrorMessages,
} from '@fe/shared';
import { COUNTRIES, ImageBasic } from '@shared';
import { ImageUploader } from '../image-uploader/image-uploader';
import { ColorPicker } from '../color-picker/color-picker';
import { QuillEditor } from '../quill-editor/quill-editor';
import { RemoveItem } from '../remove-item/remove-item';

interface FormValues {
  image: ImageBasic;
  color: string;
  text: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string | null;
  bio: string;
  dateOfBirth: Date | null;
  country: string;
  photo: ImageBasic;
  images: ImageBasic[];
  range: [number, number];
  pet: string; // radio
  acceptTerms: boolean;
  isVisible: boolean;
  age?: number; // optional field example
}

const pets = [
  { name: 'Dog', value: 'dog' },
  { name: 'Cat', value: 'cat' },
  { name: 'Hamster', value: 'hamster' },
];

@Component({
  selector: 'lib-generic-form',
  imports: [
    ReactiveFormsModule,
    ImageUploader,
    ColorPicker,
    QuillEditor,
    FormControlWrapper,
    InputTextModule,
    TextareaModule,
    PasswordModule,
    FormControlWrapper,
    CustomButton,
    InputMaskModule,
    DatePickerModule,
    CheckboxModule,
    InputNumberModule,
    SelectModule,
    SliderModule,
    ToggleSwitchModule,
    RadioButtonModule,
    RemoveItem,
  ],
  templateUrl: './generic-form.html',
  styleUrl: './generic-form.css',
})
export class GenericForm {
  private formBuilder = inject(FormBuilder);
  protected isSubmitting = signal(false);
  form = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          passwordStrengthValidator(),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          passwordStrengthValidator(),
        ],
      ],
      bio: ['', Validators.maxLength(300)],
      text: [
        '<p>Now imagine that your application has many different forms where an address is required. We wouldn&#39;t want to repeat all the code needed for displaying and validating those fields across every form.</p><p>Instead, what we would like to do is to create a reusable form section under the form of an Angular component, that we could then plug into multiple forms, sort of a nested reusable sub-form.</p><p>Here is how we would like to use such an address form component:</p>',
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\(\d{3}\) \d{2} \d{3} \d{4}$/),
        ],
      ],
      dateOfBirth: [null, Validators.required],
      country: ['', Validators.required],
      image: this.formBuilder.control(getDefaultImage()),
      photo: [getDefaultImage()], // this works too
      images: this.formBuilder.array([
        this.formBuilder.control(getDefaultImage()),
      ]),
      range: [
        [20, 50],
        [Validators.required, rangeValidator([0, 100])],
      ],
      pet: ['', Validators.required],
      acceptTerms: [false, Validators.required],
      isVisible: [false, Validators.required],
      age: [null, Validators.min(0)],
      favoriteColor: this.formBuilder.control('#ffffff'),
    },
    {
      validators: passwordMatchValidator,
    },
  );
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get bio() {
    return this.form.get('bio');
  }
  get text() {
    return this.form.get('text');
  }
  get phone() {
    return this.form.get('phone');
  }
  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
  get country() {
    return this.form.get('country');
  }
  get photo() {
    return this.form.get('photo');
  }
  get images() {
    return this.form.get('images') as FormArray<any>;
  }
  get range() {
    return this.form.get('range');
  }
  get pet() {
    return this.form.get('pet');
  }
  get acceptTerms() {
    return this.form.get('acceptTerms');
  }
  get isVisible() {
    return this.form.get('isVisible');
  }
  get age() {
    return this.form.get('age');
  }
  get favoriteColor() {
    return this.form.get('favoriteColor');
  }
  pets = pets;
  countries = COUNTRIES;

  onSubmit(values: FormValues) {
    console.log('values', values);
  }

  getErrorsForConfirmPassword() {
    return {
      ...(this.confirmPassword?.errors || {}),
      ...(this.form.errors?.['passwordMismatch']
        ? { passwordMismatch: validationErrorMessages['passwordMismatch'] }
        : {}),
    };
  }

  addImage(formArray = this.images) {
    formArray.push(this.formBuilder.control(getDefaultImage()));
  }

  getFormControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }
}
