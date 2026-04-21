import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { AIHouseCreate, ImageType, SEOBasic } from '@shared';
import { SeoService } from '@fe/shared';
import { DataStore } from '@ap/shared';
import { AiHouseForm } from '../ai-house-form/ai-house-form';

const URL = 'ai-houses';

@Component({
  selector: 'lib-ai-house-create',
  imports: [AiHouseForm],
  templateUrl: './ai-house-create.html',
  styleUrl: './ai-house-create.css',
  providers: [DataStore],
})
export class AiHouseCreate implements OnInit {
  seoData: SEOBasic = {
    id: 'ai-house-create',
    title: 'AI House Create - AI HOUSES',
    headline: 'AI House Create',
    description:
      'Create a new AI-generated house entry. Define architecture, interior design, and related details.',
    url: '',
    image: {
      id: 'ai-house-create-hero',
      src: '',
      alt: 'AI House Create',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private seoService = inject(SeoService);
  private dataStore = inject(DataStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }

  create(data: AIHouseCreate) {
    const images = data.images.map((image) => {
      const { id, ...rest } = image;
      return rest;
    });
    const seoImage = data.seo.image;
    const { id, ...seoImageRest } = seoImage;
    const createData = {
      ...data,
      images,
      seo: {
        ...data.seo,
        image: seoImageRest,
      },
    };
    this.dataStore
      .create(URL, createData)
      .pipe(
        tap((res) =>
          this.router.navigate(['../edit', res.id], { relativeTo: this.route }),
        ),
      )
      .subscribe();
  }
}
