import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { ImageType, SEOBasic, Vehicle, VehicleCreate } from '@shared';
import { SeoService } from '@fe/shared';
import { DataStore } from '@ap/shared';
import { VehicleForm } from '../vehicle-form/vehicle-form';

const URL = 'vehicles';

@Component({
  selector: 'lib-vehicle-create',
  imports: [VehicleForm],
  templateUrl: './vehicle-create.html',
  styleUrl: './vehicle-create.css',
  providers: [DataStore],
})
export class VehicleCreatePage implements OnInit {
  seoData: SEOBasic = {
    id: 'vehicle-create',
    title: 'Vehicle Create - AI HOUSES',
    headline: 'Vehicle Create',
    description:
      'Create a new vehicle entry for the catalog with media, metadata, and SEO details.',
    url: '',
    image: {
      id: 'vehicle-create-hero',
      src: '',
      alt: 'Vehicle Create',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private seoService = inject(SeoService);
  private dataStore = inject(DataStore<Vehicle>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }

  create(data: VehicleCreate) {
    const images = data.images.map((image) => {
      const copy = { ...image };
      delete (copy as { id?: string }).id;
      return copy;
    });

    const previewImage = { ...data.previewImage };
    delete (previewImage as { id?: string }).id;

    const seoImageRest = { ...data.seo.image };
    delete (seoImageRest as { id?: string }).id;

    const createData = {
      ...data,
      previewImage,
      images,
      seo: {
        ...data.seo,
        image: seoImageRest,
      },
    };

    this.dataStore
      .create(URL, createData)
      .pipe(
        tap((res) => {
          if (res?.id) {
            this.router.navigate(['../edit', res.id], {
              relativeTo: this.route,
            });
          }
        }),
      )
      .subscribe();
  }
}
