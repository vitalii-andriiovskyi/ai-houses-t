import { Component, input } from '@angular/core';

import { Button, Image } from '@shared';
import { CustomButton } from '@fe/shared';

export interface PromoSectionContent {
  title: string;
  description: string;
  button: Button;
  buttonMobile: Button;
  img: Image;
}

@Component({
  selector: 'lib-promo-section',
  standalone: true,
  imports: [CustomButton],
  templateUrl: './promo-section.html',
  styleUrl: './promo-section.css',
})
export class PromoSection {
  content = input<PromoSectionContent | null>();
}
