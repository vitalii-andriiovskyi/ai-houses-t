import { Component, inject, OnInit } from '@angular/core';

import { SEO } from '@shared';
import { SeoService } from '@fe/shared';

@Component({
  selector: 'lib-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage implements OnInit {
  seoData: SEO = {
    id: 'home',
    title: 'AI Houses - AI HOUSES',
    headline: 'AI Houses',
    description: 'AI Houses contains posts about AI-generated houses, architecture, interior design, and related topics. Explore the intersection of AI and architecture with us.',
    url: '',
    image: {
      id: 'home-hero',
      src: '',
      alt: 'AI Houses',
      type: 'HeroImage'
    },
  };

  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }
}
