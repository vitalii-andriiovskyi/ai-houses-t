import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';

import { CustomButton, FormControlWrapper } from '@fe/shared';

interface ContactUsFormValues {
  name: string;
  email: string;
  message: string;
  action: 'sayHi' | 'getAQuote';
}

interface ActionOption {
  name: string;
  value: 'sayHi' | 'getAQuote';
}

export interface ContactUsFormContent {
  name: {
    label: string;
    placeholder: string;
  };
  email: {
    label: string;
    placeholder: string;
  };
  message: {
    label: string;
    placeholder: string;
  };
  action: {
    [key: string]: {
      label: string;
    };
  };
  submitButton: {
    text: string;
    loadingText: string;
  };
}
const actionOptions: ActionOption[] = [
  { name: 'Say Hi', value: 'sayHi' },
  { name: 'Get a Quote', value: 'getAQuote' },
];

@Component({
  selector: 'lib-contact-us-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    RadioButtonModule,
    FormControlWrapper,
    CustomButton,
  ],
  templateUrl: './contact-us-form.html',
  styleUrl: './contact-us-form.css',
})
export class ContactUsForm {
  private formBuilder = inject(FormBuilder);
  protected isSubmitting = signal(false);
  content = input<ContactUsFormContent | null>();
  actionOptions = actionOptions;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
    action: ['sayHi', Validators.required],
  });

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get message() {
    return this.form.get('message');
  }

  get action() {
    return this.form.get('action');
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      const formValues = this.form.value as ContactUsFormValues;
      console.log('Form submitted:', formValues);
      // TODO: Implement actual form submission logic
      this.isSubmitting.set(false);
    }
  }
}
