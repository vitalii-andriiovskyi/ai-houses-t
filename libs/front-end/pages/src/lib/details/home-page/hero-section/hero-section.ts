import { Component, input } from '@angular/core';

import { Button, Image, ImageType } from '@shared';
import { CustomButton } from '@fe/shared';

interface HeroSectionContent {
  title: string;
  description: string;
  button: Button;
  img: Image;
}

const content: HeroSectionContent = {
  title: 'Navigating the digital landscape for success',
  description:
    'Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.',
  button: {
    id: 'hero-section-button',
    text: 'Book a consultation',
    url: '/',
  },
  img: {
    id: 'hero-section-image',
    src: '/images/home-page/megaphone.svg',
    alt: 'Megaphone with orbit elements and social icons',
    width: 600,
    height: 515,
    type: ImageType.HeroImage,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

@Component({
  selector: 'lib-hero-section',
  standalone: true,
  imports: [CustomButton],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  content = input<HeroSectionContent>(content);
}
