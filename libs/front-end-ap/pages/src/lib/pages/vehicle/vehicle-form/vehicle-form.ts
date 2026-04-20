import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { CustomButton, FormControlWrapper, getDefaultImage } from '@fe/shared';
import { ImageBasic, Vehicle, VehicleCreate } from '@shared';
import { ImageUploader, QuillEditor, RemoveItem } from '@ap/shared';
import { UserStore } from '@fe/user';

@Component({
  selector: 'lib-vehicle-form',
  imports: [
    ReactiveFormsModule,
    ImageUploader,
    QuillEditor,
    FormControlWrapper,
    CustomButton,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    ToggleSwitchModule,
    RemoveItem,
  ],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {
  data = input<Vehicle | null>(null);
  save = output<VehicleCreate>();

  private userStore = inject(UserStore);
  user = toSignal(this.userStore.user$);

  private formBuilder = inject(FormBuilder);
  protected isSubmitting = signal(false);

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    url: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    model: ['', [Validators.required, Validators.maxLength(255)]],
    color: ['', [Validators.required, Validators.maxLength(255)]],
    year: [null as number | null, [Validators.required, Validators.min(1900)]],
    doors: [null as number | null, [Validators.required, Validators.min(1)]],
    seats: [null as number | null, [Validators.required, Validators.min(1)]],
    mileage: [null as number | null, [Validators.min(0)]],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    available: [true, Validators.required],
    previewImage: this.formBuilder.control(getDefaultImage()),
    ownerId: [''],
    images: this.formBuilder.array([
      this.formBuilder.control(getDefaultImage(), { nonNullable: true }),
    ]),
    seo: this.formBuilder.group({
      title: ['', Validators.required],
      headline: ['', Validators.required],
      description: ['', Validators.required],
      url: [''],
      image: this.formBuilder.control(getDefaultImage()),
      keywords: this.formBuilder.array([
        this.formBuilder.control('', { nonNullable: true }),
      ]),
    }),
  });

  isFormPatched = false;

  constructor() {
    effect(() => {
      const value = this.data();
      if (value) {
        this._patchForm(value);
      }

      const ownerId = this.user()?.id;
      if (ownerId && !this.ownerId?.value) {
        this.form.get('ownerId')?.setValue(ownerId);
      }
    });
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get ownerId() {
    return this.form.get('ownerId');
  }
  get doors() {
    return this.form.get('doors');
  }
  get seats() {
    return this.form.get('seats');
  }
  get year() {
    return this.form.get('year');
  }
  get mileage() {
    return this.form.get('mileage');
  }
  get color() {
    return this.form.get('color');
  }
  get model() {
    return this.form.get('model');
  }
  get price() {
    return this.form.get('price');
  }
  get available() {
    return this.form.get('available');
  }
  get url() {
    return this.form.get('url');
  }
  get previewImage() {
    return this.form.get('previewImage');
  }
  get images() {
    return this.form.get('images') as FormArray<FormControl<ImageBasic>>;
  }
  get seoTitle() {
    return this.form.get('seo.title');
  }
  get seoHeadline() {
    return this.form.get('seo.headline');
  }
  get seoDescription() {
    return this.form.get('seo.description');
  }
  get seoUrl() {
    return this.form.get('seo.url');
  }
  get seoImage() {
    return this.form.get('seo.image');
  }
  get seoKeywords() {
    return this.form.get('seo.keywords') as FormArray<FormControl<string>>;
  }

  onSubmit() {
    this.save.emit(this.form.value as VehicleCreate);
    this.isFormPatched = false;
  }

  addImage() {
    this.images.push(
      this.formBuilder.control(getDefaultImage(), { nonNullable: true }),
    );
  }

  addSeoKeyword() {
    this.seoKeywords.push(this.formBuilder.control('', { nonNullable: true }));
  }

  removeSeoKeyword(index: number) {
    this.seoKeywords.removeAt(index);
  }

  getFormControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }

  private _patchForm(value: Vehicle) {
    if (this.isFormPatched) {
      return;
    }

    this.form.patchValue({
      name: value.name,
      description: value.description,
      doors: value.doors,
      seats: value.seats,
      year: value.year,
      mileage: value.mileage ?? null,
      color: value.color,
      model: value.model,
      price: value.price,
      available: value.available,
      url: value.url,
      previewImage: {
        id: value.previewImage.id,
        src: value.previewImage.src,
        alt: value.previewImage.alt,
        title: value.previewImage.title,
        width: value.previewImage.width,
        height: value.previewImage.height,
        type: value.previewImage.type,
        caption: value.previewImage.caption,
        description: value.previewImage.description,
      } as ImageBasic,
      seo: {
        title: value.seo.title,
        headline: value.seo.headline,
        description: value.seo.description,
        url: value.seo.url ?? '',
      },
    });

    this.images.clear();
    for (const img of value.images) {
      this.images.push(
        this.formBuilder.control(
          {
            id: img.id,
            src: img.src,
            alt: img.alt,
            title: img.title,
            width: img.width,
            height: img.height,
            type: img.type,
            caption: img.caption,
            description: img.description,
          } as ImageBasic,
          { nonNullable: true },
        ),
      );
    }

    if (value.seo.image) {
      this.form.get('seo.image')?.setValue({
        id: value.seo.image.id,
        src: value.seo.image.src,
        alt: value.seo.image.alt,
        title: value.seo.image.title,
        width: value.seo.image.width,
        height: value.seo.image.height,
        type: value.seo.image.type,
        caption: value.seo.image.caption,
        description: value.seo.image.description,
      } as ImageBasic);
    }

    this.seoKeywords.clear();
    if (value.seo.keywords?.length) {
      for (const kw of value.seo.keywords) {
        this.seoKeywords.push(
          this.formBuilder.control(kw, { nonNullable: true }),
        );
      }
    } else {
      this.seoKeywords.push(
        this.formBuilder.control('', { nonNullable: true }),
      );
    }

    this.isFormPatched = true;
  }
}
