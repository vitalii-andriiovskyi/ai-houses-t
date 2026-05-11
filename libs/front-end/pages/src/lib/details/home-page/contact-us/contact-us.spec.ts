import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactUs } from './contact-us';
import { ContactUsForm } from './contact-us-form/contact-us-form';

const customContent = {
  title: 'Reach Out',
  description: 'We would love to hear from you',
  form: {
    name: { label: 'Full Name', placeholder: 'Your name' },
    email: { label: 'Email Address', placeholder: 'your@email.com' },
    message: { label: 'Your Message', placeholder: 'Write here...' },
    action: {
      sayHi: { label: 'Hello' },
      getAQuote: { label: 'Quote Please' },
    },
    submitButton: { text: 'Submit', loadingText: 'Submitting...' },
  },
};

describe('ContactUs', () => {
  let component: ContactUs;
  let fixture: ComponentFixture<ContactUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUs],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default content', () => {
    it('should render the default title', () => {
      const heading = fixture.nativeElement.querySelector('lib-heading');
      expect(heading?.textContent?.trim()).toBe('Contact Us');
    });

    it('should render the default description', () => {
      const description = fixture.nativeElement.querySelector('p');
      expect(description?.textContent?.trim()).toContain('Connect with Us');
    });

    it('should render the ContactUsForm child', () => {
      const formEl = fixture.debugElement.query(By.directive(ContactUsForm));
      expect(formEl).toBeTruthy();
    });

    it('should pass the default form content to ContactUsForm', () => {
      const formEl = fixture.debugElement.query(By.directive(ContactUsForm));
      const formContent = formEl.componentInstance.content();
      expect(formContent?.name?.label).toBe('Name');
      expect(formContent?.email?.label).toBe('Email');
      expect(formContent?.submitButton?.text).toBe('Send Message');
    });
  });

  describe('custom content input', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('content', customContent);
      fixture.detectChanges();
    });

    it('should render the custom title', () => {
      const heading = fixture.nativeElement.querySelector('lib-heading');
      expect(heading?.textContent?.trim()).toBe('Reach Out');
    });

    it('should render the custom description', () => {
      const description = fixture.nativeElement.querySelector('p');
      expect(description?.textContent?.trim()).toBe(
        'We would love to hear from you',
      );
    });

    it('should pass the custom form content to ContactUsForm', () => {
      const formEl = fixture.debugElement.query(By.directive(ContactUsForm));
      expect(formEl.componentInstance.content()).toEqual(customContent.form);
    });

    it('should reflect updated action labels in the form content', () => {
      const formEl = fixture.debugElement.query(By.directive(ContactUsForm));
      const formContent = formEl.componentInstance.content();
      expect(formContent?.action?.['sayHi']?.label).toBe('Hello');
      expect(formContent?.action?.['getAQuote']?.label).toBe('Quote Please');
    });
  });
});
