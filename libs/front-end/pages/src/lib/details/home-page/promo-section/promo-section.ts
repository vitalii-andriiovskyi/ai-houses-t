import { Component, input } from '@angular/core';

import { Button, Image, ImageType } from '@shared';
import { CustomButton } from '@fe/shared';

interface PromoSectionContent {
  title: string;
  description: string;
  button: Button;
  buttonMobile: Button;
  img: Image;
}

const content: PromoSectionContent = {
  title: "Let's make things happen",
  description:
    'Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.',
  button: {
    id: 'promo-section-button',
    text: 'Get your free proposal',
    url: '/',
  },
  buttonMobile: {
    id: 'promo-section-button-mobile',
    text: 'Get your proposal',
    url: '/',
  },
  img: {
    id: 'promo-section-illustration',
    src: '/images/home-page/promo-section/things-happen-illustration.png',
    alt: 'Decorative stars and smiley illustration',
    type: ImageType.RegularImage,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

@Component({
  selector: 'lib-promo-section',
  standalone: true,
  imports: [CustomButton],
  templateUrl: './promo-section.html',
  styleUrl: './promo-section.css',
})
export class PromoSection {
  content = input<PromoSectionContent | null>(content);
}
