import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ImageType, SEOBasic } from '@shared';
import { SeoService } from '@fe/shared';

@Component({
  selector: 'lib-ai-house-details-page',
  imports: [RouterOutlet],
  templateUrl: './ai-house-details-page.html',
  styleUrl: './ai-house-details-page.css',
})
export class AiHouseDetailsPage implements OnInit {
  seoData: SEOBasic = {
    id: 'ai-house-details',
    title: 'AI House Details - AI HOUSES',
    headline: 'AI House Details',
    description:
      'Detailed information about a specific AI-generated house, including architecture, interior design, and related topics.',
    url: '/ai-house-details',
    image: {
      id: 'ai-house-details',
      src: '',
      alt: 'AI House Details',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private seoService = inject(SeoService);
  //   aiHouseService = inject(AiHouseStore);
  // private activatedRoute = inject(ActivatedRoute);
  // data$ = this.activatedRoute.params.pipe(
  //   switchMap((params) => this.aiHouseService.getEntityByURL(params['id']))
  // );
  ngOnInit() {
    this.seoService.setPostSeoData(this.seoData); // TODO: replace with actual data when available using :id from URL or similar
  }
}
