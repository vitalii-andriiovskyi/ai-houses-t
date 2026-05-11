import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Heading } from '@fe/shared';
import {
  ContactUsForm,
  type ContactUsFormContent,
} from './contact-us-form/contact-us-form';

interface ContactUsContent {
  title: string;
  description: string;
  form: ContactUsFormContent;
}

const defaultContent: ContactUsContent = {
  title: 'Contact Us',
  description: "Connect with Us: Let's Discuss Your Digital Marketing Needs",
  form: {
    name: {
      label: 'Name',
      placeholder: 'Name',
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email',
    },
    message: {
      label: 'Message',
      placeholder: 'Enter your message',
    },
    action: {
      sayHi: {
        label: 'Say Hi',
      },
      getAQuote: {
        label: 'Get a Quote',
      },
    },
    submitButton: {
      text: 'Send Message',
      loadingText: 'Sending...',
    },
  },
};

@Component({
  selector: 'lib-contact-us',
  imports: [Heading, ContactUsForm],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs {
  content = input<ContactUsContent>(defaultContent);
}
