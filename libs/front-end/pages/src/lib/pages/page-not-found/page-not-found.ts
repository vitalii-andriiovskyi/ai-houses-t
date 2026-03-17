import { Component, inject, OnInit } from '@angular/core';

import { SEO } from '@shared';
import { SeoService } from '@fe/shared';
import { ButtonDirective } from "primeng/button";

@Component({
  selector: 'lib-page-not-found',
  imports: [ButtonDirective],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound implements OnInit {
  seoData: SEO = {
    id: 'page-not-found',
    title: 'Page Not Found - AI HOUSES',
    headline: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: '/page-not-found',
    image: {
      id: 'page-not-found',
      src: '',
      alt: 'Page Not Found',
      type: 'HeroImage'
    },
  };

  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }
}
