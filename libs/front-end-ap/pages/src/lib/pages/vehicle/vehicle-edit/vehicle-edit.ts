import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { ImageType, SEOBasic, Vehicle, VehicleCreate } from '@shared';
import { CustomButton, SeoService } from '@fe/shared';
import { DataStore } from '@ap/shared';
import { VehicleForm } from '../vehicle-form/vehicle-form';

const getURL = (id: string) => `vehicles/${id}`;

@Component({
  selector: 'lib-vehicle-edit',
  imports: [VehicleForm, CustomButton],
  templateUrl: './vehicle-edit.html',
  styleUrl: './vehicle-edit.css',
  providers: [DataStore],
})
export class VehicleEdit implements OnInit {
  id = '';
  seoData: SEOBasic = {
    id: 'vehicle-edit',
    title: 'Vehicle Edit - AI HOUSES',
    headline: 'Vehicle Edit',
    description:
      'Edit an existing vehicle entry. Update details, images, and SEO content for publishing.',
    url: '',
    image: {
      id: 'vehicle-edit-hero',
      src: '',
      alt: 'Vehicle Edit',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private seoService = inject(SeoService);
  private dataStore = inject(DataStore<Vehicle>);
  data = this.dataStore.data;
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
    this.activatedRoute.params
      .pipe(
        tap((params) => {
          this.id = params['id'];
        }),
        switchMap((params) => this.dataStore.load(getURL(params['id']))),
      )
      .subscribe();
  }

  update(data: VehicleCreate) {
    const newData = { ...data };
    newData.seo.id = this.data().seo.id;
    this.dataStore.update(getURL(this.id), newData).subscribe();
  }
}
