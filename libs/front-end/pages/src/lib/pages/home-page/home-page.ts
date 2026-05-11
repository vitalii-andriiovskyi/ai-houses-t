import { Component, inject, OnInit } from '@angular/core';

import { ImageType, SEOBasic } from '@shared';
import { SeoService } from '@fe/shared';
import { LeadingSection } from '../../details/home-page/leading-section/leading-section';
import { LogosSection } from '../../details/home-page/logos-section/logos-section';
import { PromoSection } from '../../details/home-page/promo-section/promo-section';
import { ServicesSection } from '../../details/home-page/services-section/services-section';
import { StudiesSection } from '../../details/home-page/studies-section/studies-section';
import { TeamSectionComponent } from '../../details/home-page/team-section';
import { TestimonialsSection } from '../../details/home-page/testimonials-section/testimonials-section';
import { WorkflowSection } from '../../details/home-page/workflow-section/workflow-section';
import { ContactUs } from '../../details/home-page/contact-us/contact-us';
import { homePageContent } from './data';

@Component({
  selector: 'lib-home-page',
  standalone: true,
  imports: [
    LeadingSection,
    LogosSection,
    ServicesSection,
    PromoSection,
    StudiesSection,
    WorkflowSection,
    TeamSectionComponent,
    TestimonialsSection,
    ContactUs,
  ],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage implements OnInit {
  seoData: SEOBasic = {
    id: 'home',
    title: 'AI Houses - AI HOUSES',
    headline: 'AI Houses',
    description:
      'AI Houses contains posts about AI-generated houses, architecture, interior design, and related topics. Explore the intersection of AI and architecture with us.',
    url: '',
    image: {
      id: 'home-hero',
      src: '',
      alt: 'AI Houses',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  readonly content = homePageContent;

  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }
}
