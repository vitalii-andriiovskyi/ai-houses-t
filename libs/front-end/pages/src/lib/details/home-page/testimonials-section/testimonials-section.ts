import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { Heading } from '@fe/shared';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  position: string;
}

interface TestimonialsSectionContent {
  title: string;
  description: string;
  items: TestimonialItem[];
}

const content: TestimonialsSectionContent = {
  title: 'Testimonials',
  description:
    'Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services',
  items: [
    {
      id: 'testimonial-john-smith',
      quote:
        '"We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence."',
      author: 'John Smith',
      position: 'Marketing Director at XYZ Corp',
    },
    {
      id: 'testimonial-jane-doe',
      quote:
        '"Positivus transformed our lead generation process. Their strategic campaigns helped us attract high-quality prospects and improved our conversion rate quarter over quarter. Communication is always fast, clear, and focused on outcomes."',
      author: 'Jane Doe',
      position: 'Head of Growth at BrightPath',
    },
    {
      id: 'testimonial-michael-brown',
      quote:
        '"From SEO improvements to paid media optimization, every recommendation was practical and data-driven. We saw meaningful gains in organic visibility and measurable ROI in just a few months."',
      author: 'Michael Brown',
      position: 'Founder at MarketFlow',
    },
    {
      id: 'testimonial-emily-johnson',
      quote:
        '"Working with Positivus feels like having an extension of our own team. They quickly understood our brand, proposed a clear plan, and executed with consistency. Our traffic and engagement are now at an all-time high."',
      author: 'Emily Johnson',
      position: 'CMO at NovaRetail',
    },
    {
      id: 'testimonial-daniel-kim',
      quote:
        '"Their ability to combine creative messaging with performance analysis is exceptional. We appreciate how transparent they are with reporting and how proactively they suggest improvements every month."',
      author: 'Daniel Kim',
      position: 'Operations Lead at CoreStack',
    },
    {
      id: 'testimonial-daniel-kim-5',
      quote:
        '"Their ability to combine creative messaging with performance analysis is exceptional. We appreciate how transparent they are with reporting and how proactively they suggest improvements every month."',
      author: 'Daniel Kim',
      position: 'Operations Lead at CoreStack',
    },
  ],
};

@Component({
  selector: 'lib-testimonials-section',
  standalone: true,
  imports: [Heading, CarouselModule],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsSection {
  readonly content = input<TestimonialsSectionContent | null>(content);

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
