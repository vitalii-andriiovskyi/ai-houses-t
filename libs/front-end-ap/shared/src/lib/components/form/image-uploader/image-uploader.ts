import { Component, inject, input, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';

import { ImageBasic, ImageType } from '@shared';
import { APP_CONFIG_TOKEN, FormControlWrapper, getId } from '@fe/shared';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

// https://blog.angular-university.io/angular-custom-form-controls/
/**
 * `<lib-image-uploader formControlName="image"></lib-image-uploader>`
 *
 * The whole form can be used as a form control in a parent form. This form control in a parent controll could lack the state `touched`,
 *
 * There's no implementation for marking all fields as touched, if it's needed to have all the fields marked as touched when to call the markAllAsTouched method on the parent form.
 * The way of implementing it is described in https://stackoverflow.com/questions/71606830/how-to-mark-nested-angular-form-as-touched-implementing-controlvalueaccessor
 */
@Component({
  selector: 'lib-image-uploader',
  imports: [
    ReactiveFormsModule,
    FormControlWrapper,
    FileUploadModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImageUploader,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ImageUploader,
    },
  ],
  templateUrl: './image-uploader.html',
  styleUrl: './image-uploader.css',
})
export class ImageUploader
  implements ControlValueAccessor, Validator, OnDestroy
{
  nameStart = input.required<string>();
  legend = input<string>('');
  withTitle = input<boolean>(false);
  withType = input<boolean>(false);
  withCaption = input<boolean>(false);
  withDescription = input<boolean>(false);
  imageTypes = Object.values(ImageType).map((type) => ({
    label: type,
    value: type,
  }));

  appConfig = inject(APP_CONFIG_TOKEN);
  fileUploadUrl = this.appConfig.fileUploadUrl;

  private formBuilder = inject(FormBuilder);
  imageForm = this.formBuilder.group({
    id: [getId(), [Validators.required]],
    src: ['', [Validators.required]],
    alt: ['', [Validators.required]],
    title: ['', [Validators.maxLength(100)]],
    width: [0, [Validators.min(0)]],
    height: [0, [Validators.min(0)]],
    type: [ImageType.RegularImage],
    caption: ['', [Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(255)]],
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  onChangeSubs: Subscription[] = [];

  get src() {
    return this.imageForm.get('src');
  }

  get alt() {
    return this.imageForm.get('alt');
  }

  get title() {
    return this.imageForm.get('title');
  }
  get type() {
    return this.imageForm.get('type');
  }
  get caption() {
    return this.imageForm.get('caption');
  }
  get description() {
    return this.imageForm.get('description');
  }

  onUploadImage($event: FileUploadEvent) {
    const body: ImageBasic = ($event?.originalEvent as any)?.body; // image data ufter upload is not tested, so this line could trhow an error
    if (body) {
      this.imageForm.patchValue({
        src: body.src,
        width: body.width,
        height: body.height,
      });
    }
  }

  onError() {
    // for demo purpose only as I don't have BE implemented
    const demoImage = {
      src: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
      width: 400,
      height: 600,
    };
    this.imageForm.patchValue({
      src: demoImage.src,
      width: demoImage.width,
      height: demoImage.height,
    });
  }

  getFieldId(fieldName: string) {
    return `${this.nameStart()}.${fieldName}`;
  }

  ngOnDestroy() {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  // ************* ControlValueAccessor implementation *************
  registerOnChange(onChange: any) {
    const sub = this.imageForm.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched; // then use onTouched on every control for (blur) event
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.imageForm.disable();
    } else {
      this.imageForm.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.imageForm.setValue(value, { emitEvent: false });
    }
  }

  // To have all the fields marked as touched if to call the markAllAsTouched method on the parent form
  // https://stackoverflow.com/questions/71606830/how-to-mark-nested-angular-form-as-touched-implementing-controlvalueaccessor
  //   markAsTouched() {
  //   if (!this.touched) {
  //     this.onTouched();
  //     this.touched = true;
  //   }
  // }

  // ************* Validator implementation *************
  validate(control: AbstractControl) {
    if (this.imageForm.valid) {
      return null;
    }

    const errors: ValidationErrors = Object.keys(
      this.imageForm.controls,
    ).reduce(
      (acc, key: string) => ({
        ...acc,
        ...this.getControlErrors(key),
      }),
      {},
    );

    return errors;
  }

  getControlErrors(controlName: string) {
    const controlErrors = this.imageForm.get(controlName)?.errors;

    if (controlErrors) {
      return { [controlName]: controlErrors };
    }

    return {};
  }
}
