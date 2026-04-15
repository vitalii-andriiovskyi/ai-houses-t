import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TextareaModule } from 'primeng/textarea';

import {
  CustomButton,
  FormControlWrapper,
  getDefaultImage,
  zoneErrorMessages,
  zoneValidator,
} from '@fe/shared';
import {
  AIHouse,
  AIHouseCreate,
  COUNTRIES,
  ImageBasic,
  getZones,
} from '@shared';
import { ImageUploader, QuillEditor, RemoveItem } from '@ap/shared';
import { UserStore } from '@fe/user';

@Component({
  selector: 'lib-ai-house-form',
  imports: [
    ReactiveFormsModule,
    ImageUploader,
    QuillEditor,
    FormControlWrapper,
    CustomButton,
    InputTextModule,
    TextareaModule,
    DatePickerModule,
    InputNumberModule,
    SelectModule,
    ToggleSwitchModule,
    RemoveItem,
    AsyncPipe,
  ],
  templateUrl: './ai-house-form.html',
  styleUrl: './ai-house-form.css',
})
export class AiHouseForm {
  data = input<AIHouse | null>(null);
  save = output<AIHouseCreate>();

  private userStore = inject(UserStore);
  user = toSignal(this.userStore.user$);

  private formBuilder = inject(FormBuilder);
  protected isSubmitting = signal(false);
  countries = COUNTRIES;

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    ownerId: [''], // for now it'll be adminId, so it will be set in the constructor, when user is loaded,
    rooms: [null as number | null, [Validators.required, Validators.min(1)]],
    area: [null as number | null, [Validators.required, Validators.min(1)]],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    available: [true, Validators.required],
    builtYear: [null as Date | null, Validators.required],
    lastRenovation: [null as Date | null],
    url: ['', Validators.required],
    features: this.formBuilder.array([
      this.formBuilder.control('', { nonNullable: true }),
    ]),
    images: this.formBuilder.array([
      this.formBuilder.control(getDefaultImage()),
    ]),
    address: this.formBuilder.group(
      {
        address1: ['', Validators.required],
        address2: [''],
        city: ['', Validators.required],
        state: [''],
        zip: ['', Validators.required],
        country: ['', Validators.required],
        apt: [''],
      },
      {
        validators: [zoneValidator({ country: 'country', zone: 'state' })],
      },
    ),
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

  zones$ = this.country?.valueChanges.pipe(
    map((countryCode) => getZones(countryCode || '')),
    tap((zones) => {
      if (!zones?.length) {
        this.state?.setValue('');
      }
    }),
  );
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

  // Top-level getters
  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get ownerId() {
    return this.form.get('ownerId');
  }
  get rooms() {
    return this.form.get('rooms');
  }
  get area() {
    return this.form.get('area');
  }
  get price() {
    return this.form.get('price');
  }
  get available() {
    return this.form.get('available');
  }
  get builtYear() {
    return this.form.get('builtYear');
  }
  get lastRenovation() {
    return this.form.get('lastRenovation');
  }
  get url() {
    return this.form.get('url');
  }
  get features() {
    return this.form.get('features') as FormArray<FormControl<string>>;
  }
  get images() {
    return this.form.get('images') as FormArray<FormControl<ImageBasic>>;
  }

  // Address getters
  get addressGroup() {
    return this.form.get('address');
  }
  get address1() {
    return this.form.get('address.address1');
  }
  get address2() {
    return this.form.get('address.address2');
  }
  get city() {
    return this.form.get('address.city');
  }
  get state() {
    return this.form.get('address.state');
  }
  get zip() {
    return this.form.get('address.zip');
  }
  get country() {
    return this.form.get('address.country');
  }
  get apt() {
    return this.form.get('address.apt');
  }

  // SEO getters
  get seoGroup() {
    return this.form.get('seo');
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
    this.save.emit(this.form.value as AIHouseCreate);
    this.isFormPatched = false;
  }

  addImage() {
    this.images.push(
      this.formBuilder.control(getDefaultImage(), { nonNullable: true }),
    );
  }

  addFeature() {
    this.features.push(this.formBuilder.control('', { nonNullable: true }));
  }

  removeFeature(index: number) {
    this.features.removeAt(index);
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

  getZoneErrorMessage(label: string) {
    const errors = this.state?.errors;
    if (errors && typeof errors === 'object') {
      return Object.entries(errors).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: zoneErrorMessages[key] ? zoneErrorMessages[key](label) : value,
        }),
        {},
      );
    }
    return errors || null;
  }

  private _patchForm(value: AIHouse) {
    if (this.isFormPatched) {
      return;
    }
    this.form.patchValue({
      name: value.name,
      description: value.description,
      rooms: value.rooms,
      area: value.area,
      price: value.price,
      available: value.available,
      builtYear: value.builtYear ? new Date(value.builtYear) : null,
      lastRenovation: value.lastRenovation
        ? new Date(value.lastRenovation)
        : null,
      url: value.url,
      address: {
        address1: value.address.address1,
        address2: value.address.address2 ?? '',
        city: value.address.city,
        state: value.address.state,
        zip: value.address.zip,
        country: value.address.country,
        apt: value.address.apt,
      },
      seo: {
        title: value.seo.title,
        headline: value.seo.headline,
        description: value.seo.description,
        url: value.seo.url ?? '',
      },
    });

    // Patch images
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

    // Patch features
    this.features.clear();
    if (value.features) {
      for (const feat of value.features) {
        this.features.push(
          this.formBuilder.control(feat, { nonNullable: true }),
        );
      }
    }

    // Patch SEO image
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

    // Patch SEO keywords
    this.seoKeywords.clear();
    if (value.seo.keywords) {
      for (const kw of value.seo.keywords) {
        this.seoKeywords.push(
          this.formBuilder.control(kw, { nonNullable: true }),
        );
      }
    }
    this.isFormPatched = true;
  }
}
