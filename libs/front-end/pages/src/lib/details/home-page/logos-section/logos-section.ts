import { Component, input } from '@angular/core';

import { Image, ImageType } from '@shared';

interface LogosSectionContent {
  logos: {
    children: Image[];
  };
}

const content: LogosSectionContent = {
  logos: {
    children: [
      {
        id: 'logos-section-amazon',
        src: '/images/home-page/logos/amazon.svg',
        alt: 'Amazon logo',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'logos-section-dribbble',
        src: '/images/home-page/logos/dribbble.svg',
        alt: 'Dribbble logo',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'logos-section-hubspot',
        src: '/images/home-page/logos/hubspot.svg',
        alt: 'HubSpot logo',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'logos-section-notion',
        src: '/images/home-page/logos/notion.svg',
        alt: 'Notion logo',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'logos-section-netflix',
        src: '/images/home-page/logos/netflix.svg',
        alt: 'Netflix logo',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'logos-section-zoom',
        src: '/images/home-page/logos/zoom.svg',
        alt: 'Zoom logo',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};

@Component({
  selector: 'lib-logos-section',
  standalone: true,
  imports: [],
  templateUrl: './logos-section.html',
  styleUrl: './logos-section.css',
})
export class LogosSection {
  content = input<LogosSectionContent>(content);
}
