import { Component, inject, OnInit } from '@angular/core';

import { ImageType, SEOBasic } from '@shared';
import { SeoService } from '@fe/shared';
import { Vehicles } from '@fe/vehicle';

@Component({
  selector: 'lib-vehicles-page',
  imports: [Vehicles],
  templateUrl: './vehicles-page.html',
  styleUrl: './vehicles-page.css',
})
export class VehiclesPage implements OnInit {
  seoData: SEOBasic = {
    id: 'vehicles-page',
    title: 'Vehicles - AI HOUSES',
    headline: 'Vehicles',
    description:
      'Browse available vehicles with pricing and details in AI Houses.',
    url: '/vehicles',
    image: {
      id: 'vehicles-hero',
      src: '',
      alt: 'Vehicles',
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
