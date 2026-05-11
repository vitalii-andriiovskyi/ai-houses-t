import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Heading } from '@fe/shared';
import {
  ContactUsForm,
  type ContactUsFormContent,
} from './contact-us-form/contact-us-form';

export interface ContactUsContent {
  title: string;
  description: string;
  form: ContactUsFormContent;
}

@Component({
  selector: 'lib-contact-us',
  imports: [Heading, ContactUsForm],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs {
  content = input<ContactUsContent | null>();
}
