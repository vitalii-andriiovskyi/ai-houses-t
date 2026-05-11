import { Component, input } from '@angular/core';

import { Heading } from '@fe/shared';
import {
  ServiceCard as ServiceCardComponent,
  ServiceCardContent,
  ServiceCardVariant,
} from './service-card/service-card';

export interface ServicesSectionContent {
  title: string;
  description: string;
  cards: ServiceCardContent[];
}

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
  content = input<ServicesSectionContent | null>();

  getCardVariant(index: number): ServiceCardVariant {
    return CARD_VARIANT_BY_INDEX[index % CARD_VARIANT_BY_INDEX.length];
  }
}
