import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { Heading } from '@fe/shared';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  position: string;
}

export interface TestimonialsSectionContent {
  title: string;
  description: string;
  items: TestimonialItem[];
}

@Component({
  selector: 'lib-testimonials-section',
  standalone: true,
  imports: [Heading, CarouselModule],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsSection {
  readonly content = input<TestimonialsSectionContent | null>();

  activeSlideIndex = 0;

  readonly carouselOptions: OwlOptions = {
    items: 1,
    loop: false,
    dots: true,
    nav: true,
    navText: [
      `<span class="bg-[url(/images/icons/arrow-right.svg)] bg-size-[20px] scale-[-1] inline-block w-5 h-5"></span>`,
      `<span class="bg-[url(/images/icons/arrow-right.svg)] bg-size-[20px] inline-block w-5 h-5"></span>`,
    ],
    margin: 30,
    autoHeight: true,
    stagePadding: 30,
    responsive: {
      984: {
        items: 2,
        margin: 50,
        autoHeight: false,
        center: true,
        loop: true,
        stagePadding: 53,
      },
    },
  };
}
