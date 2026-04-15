import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { ImageType, SEOBasic } from '@shared';
import { CustomButton, SeoService } from '@fe/shared';
import { DataStore } from '@ap/shared';
import { AiHouseForm } from '../ai-house-form/ai-house-form';

const getURL = (id: string) => `ai-houses/${id}`;

@Component({
  selector: 'lib-ai-house-edit',
  imports: [AiHouseForm, CustomButton],
  templateUrl: './ai-house-edit.html',
  styleUrl: './ai-house-edit.css',
  providers: [DataStore],
})
export class AiHouseEdit implements OnInit {
  id = '';
  seoData: SEOBasic = {
    id: 'ai-house-edit',
    title: 'AI House Edit - AI HOUSES',
    headline: 'AI House Edit',
    description:
      'Edit an existing AI-generated house entry. Update architecture, interior design, and related details.',
    url: '',
    image: {
      id: 'ai-house-edit-hero',
      src: '',
      alt: 'AI House Edit',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private seoService = inject(SeoService);
  private dataStore = inject(DataStore);
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

  update(data: any) {
    const newData = { ...data };
    newData.address.id = this.data().address.id;
    newData.seo.id = this.data().seo.id;
    this.dataStore.update(getURL(this.id), newData).subscribe();
  }
}
