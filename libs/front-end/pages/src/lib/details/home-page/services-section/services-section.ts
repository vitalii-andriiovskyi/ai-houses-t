import { Component, input } from '@angular/core';

import { ImageType } from '@shared';
import { Heading } from '@fe/shared';
import {
  ServiceCard as ServiceCardComponent,
  ServiceCardContent,
  ServiceCardVariant,
} from './service-card/service-card';

interface ServicesSectionContent {
  title: string;
  description: string;
  cards: ServiceCardContent[];
}

const content: ServicesSectionContent = {
  title: 'Services',
  description:
    'At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:',
  cards: [
    {
      id: 'services-search-engine-optimization',
      title: 'Search engine optimization',
      button: {
        id: 'services-link-seo',
        text: 'Learn more',
        url: '/',
      },
      image: {
        id: 'services-image-seo',
        src: 'images/home-page/services-section/tokyo-magnifier-web-search-with-elements.png',
        alt: 'Search engine optimization illustration with magnifier and interface elements',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      imageWidthMobile: 165,
    },
    {
      id: 'services-pay-per-click-advertising',
      title: 'Pay-per-click advertising',
      button: {
        id: 'services-link-ppc',
        text: 'Learn more',
        url: '/',
      },
      image: {
        id: 'services-image-ppc',
        src: 'images/home-page/services-section/tokyo-selecting-a-value-in-the-browser-window.png',
        alt: 'Pay-per-click advertising illustration with cursor and browser window',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      imageWidthMobile: 165,
    },
    {
      id: 'services-social-media-marketing',
      title: 'Social Media Marketing',
      button: {
        id: 'services-link-social-media',
        text: 'Learn more',
        url: '/',
      },
      image: {
        id: 'services-image-social-media',
        src: 'images/home-page/services-section/tokyo-browser-window-with-emoticon-likes-and-stars-around.png',
        alt: 'Social media marketing illustration with notifications and ratings',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      imageWidthMobile: 127,
    },
    {
      id: 'services-email-marketing',
      title: 'Email Marketing',
      button: {
        id: 'services-link-email-marketing',
        text: 'Learn more',
        url: '/',
      },
      image: {
        id: 'services-image-email-marketing',
        src: 'images/home-page/services-section/tokyo-sending-messages-from-one-place-to-another.png',
        alt: 'Email marketing illustration with envelopes moving between points',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      imageWidthMobile: 155,
    },
    {
      id: 'services-content-creation',
      title: 'Content Creation',
      button: {
        id: 'services-link-content-creation',
        text: 'Learn more',
        url: '/',
      },
      image: {
        id: 'services-image-content-creation',
        src: 'images/home-page/services-section/tokyo-many-browser-windows-with-different-information.png',
        alt: 'Content creation illustration with stacked browser windows',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      imageWidthMobile: 138,
    },
    {
      id: 'services-analytics-and-tracking',
      title: 'Analytics and Tracking',
      button: {
        id: 'services-link-analytics-tracking',
        text: 'Learn more',
        url: '/',
      },
      image: {
        id: 'services-image-analytics-tracking',
        src: 'images/home-page/services-section/tokyo-volumetric-analytics-of-different-types-in-web-browsers.png',
        alt: 'Analytics and tracking illustration with dashboard charts',
        type: ImageType.RegularImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      imageWidthMobile: 157,
    },
  ],
};

const CARD_VARIANT_BY_INDEX: ServiceCardVariant[] = [
  'tertiary',
  'secondary',
  'primary',
];

@Component({
  selector: 'lib-services-section',
  standalone: true,
  imports: [Heading, ServiceCardComponent],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSection {
  content = input<ServicesSectionContent>(content);

  getCardVariant(index: number): ServiceCardVariant {
    return CARD_VARIANT_BY_INDEX[index % CARD_VARIANT_BY_INDEX.length];
  }
}
