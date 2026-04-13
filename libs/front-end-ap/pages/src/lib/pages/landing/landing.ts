import { Component, inject, OnInit } from '@angular/core';
import { GenericForm } from '@ap/shared';

import { ImageType, SEOBasic } from '@shared';
import { SeoService } from '@fe/shared';

@Component({
  selector: 'lib-landing',
  imports: [GenericForm],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingPage implements OnInit {
  seoData: SEOBasic = {
    id: 'landing-page',
    title: 'Landing (Home) Page - AI HOUSES',
    headline: 'AI Houses',
    description:
      'AI Houses contains posts about AI-generated houses, architecture, interior design, and related topics. Explore the intersection of AI and architecture with us.',
    url: '',
    image: {
      id: 'landing-page-hero',
      src: '',
      alt: 'AI Houses',
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
