import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";

import { SEO } from '@shared';
import { SeoService } from '@fe/shared';
import { switchMap } from 'rxjs';

@Component({
  selector: 'lib-ai-houses-page',
  imports: [RouterModule],
  templateUrl: './ai-houses-page.html',
  styleUrl: './ai-houses-page.css',
})
export class AiHousesPage implements OnInit {
  seoData: SEO = {
    id: 'ai-houses',
    title: 'AI Houses list - AI HOUSES',
    headline: 'AI Houses list',
    description: 'AI Houses contains posts about AI-generated houses, architecture, interior design, and related topics. Explore the intersection of AI and architecture with us.',
    url: '/ai-houses',
    image: {
      id: 'ai-houses',
      src: '',
      alt: 'AI Houses',
      type: 'HeroImage'
    },
  };

  private seoService = inject(SeoService);


  ngOnInit() {
    this.seoService.setBlogSeoData('1', this.seoData);
  }
}
