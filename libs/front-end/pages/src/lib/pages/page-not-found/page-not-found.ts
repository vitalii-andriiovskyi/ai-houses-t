import { Component, inject, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';

import { ImageType, SEOBasic } from '@shared';
import { SeoService } from '@fe/shared';

@Component({
  selector: 'lib-page-not-found',
  imports: [ButtonDirective],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound implements OnInit {
  seoData: SEOBasic = {
    id: 'page-not-found',
    title: 'Page Not Found - AI HOUSES',
    headline: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: '/page-not-found',
    image: {
      id: 'page-not-found',
      src: '',
      alt: 'Page Not Found',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }
}
