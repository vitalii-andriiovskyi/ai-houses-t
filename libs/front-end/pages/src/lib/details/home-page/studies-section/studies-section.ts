import { Component, input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { Button } from '@shared';
import { Heading, CustomButton } from '@fe/shared';

interface CaseStudyItem {
  id: string;
  description: string;
  button: Button;
}

interface StudiesSectionContent {
  title: string;
  description: string;
  items: CaseStudyItem[];
}

const content: StudiesSectionContent = {
  title: 'Case Studies',
  description:
    'Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies',
  items: [
    {
      id: 'case-study-restaurant',
      description:
        'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.',
      button: {
        id: 'case-study-restaurant-btn',
        text: 'Learn more',
        url: '/',
      },
    },
    {
      id: 'case-study-b2b',
      description:
        'For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.',
      button: {
        id: 'case-study-b2b-btn',
        text: 'Learn more',
        url: '/',
      },
    },
    {
      id: 'case-study-retail',
      description:
        'For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.',
      button: {
        id: 'case-study-retail-btn',
        text: 'Learn more',
        url: '/',
      },
    },
  ],
};

@Component({
  selector: 'lib-studies-section',
  standalone: true,
  imports: [Heading, CustomButton, CarouselModule],
  templateUrl: './studies-section.html',
  styleUrl: './studies-section.css',
})
export class StudiesSection {
  content = input<StudiesSectionContent | null>(content);

  readonly carouselOptions: OwlOptions = {
    items: 1,
    loop: true,
    margin: 20,
    dots: false,
    nav: false,
    autoWidth: true,
    // center: true, // with this it looks better, but not by design
    stagePadding: 20, // doesn't work with autoWidth, so we use margin instead
  };
}
