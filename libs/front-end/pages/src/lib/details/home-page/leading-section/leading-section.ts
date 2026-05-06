import { Component, input } from '@angular/core';

import { Button, Image, ImageType } from '@shared';
import { CustomButton } from '@fe/shared';

interface LeadingSectionContent {
  title: string;
  description: string;
  button: Button;
  img: Image;
}

const content: LeadingSectionContent = {
  title: 'Navigating the digital landscape for success',
  description:
    'Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.',
  button: {
    id: 'leading-section-button',
    text: 'Book a consultation',
    url: '/',
  },
  img: {
    id: 'leading-section-image',
    src: '/images/home-page/megaphone.svg', // Figma MCP URL for the hero image (replace with local path if downloaded)
    alt: 'Digital marketing illustration',
    type: ImageType.HeroImage,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

@Component({
  selector: 'lib-leading-section',
  standalone: true,
  imports: [CustomButton],
  templateUrl: './leading-section.html',
  styleUrl: './leading-section.css',
})
export class LeadingSection {
  content = input<LeadingSectionContent>(content);
}
