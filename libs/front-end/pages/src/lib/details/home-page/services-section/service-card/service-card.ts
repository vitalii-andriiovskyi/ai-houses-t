import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { Button, Image } from '@shared';
import { CustomButton, Heading } from '@fe/shared';

export type ServiceCardVariant = 'primary' | 'secondary' | 'tertiary';

export interface ServiceCardContent {
  id: string;
  title: string;
  button: Button;
  image: Image;
  imageWidthMobile?: number;
  imageWidth?: number;
}

type ServiceCardHeadingVariant = 'secondary' | 'tertiary';
type ServiceCardButtonVariant = 'linkTertiaryFull' | 'linkPrimaryFullAccent';

interface ServiceCardStyles {
  cardBackgroundClass: string;
  headingVariant: ServiceCardHeadingVariant;
  buttonVariant: ServiceCardButtonVariant;
  imageClass: string;
}

const STYLES_BY_VARIANT: Record<ServiceCardVariant, ServiceCardStyles> = {
  primary: {
    cardBackgroundClass: 'bg-primary',
    headingVariant: 'tertiary',
    buttonVariant: 'linkTertiaryFull',
    imageClass: '',
  },
  secondary: {
    cardBackgroundClass: 'bg-secondary',
    headingVariant: 'tertiary',
    buttonVariant: 'linkPrimaryFullAccent',
    imageClass: '',
  },
  tertiary: {
    cardBackgroundClass: 'bg-tertiary',
    headingVariant: 'secondary',
    buttonVariant: 'linkPrimaryFullAccent',
    imageClass: '',
  },
};

@Component({
  selector: 'lib-service-card',
  standalone: true,
  imports: [Heading, CustomButton],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCard {
  variant = input<ServiceCardVariant>('primary');
  content = input<ServiceCardContent | null>(null);

  protected readonly _styles = computed(
    () => STYLES_BY_VARIANT[this.variant()],
  );
  protected readonly _isSvgImage = computed(
    () => this.content()?.image?.src?.toLowerCase().endsWith('.svg') || false,
  );
}
