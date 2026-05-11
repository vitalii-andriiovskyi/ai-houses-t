import { Component, input } from '@angular/core';

import { Button, Image } from '@shared';
import { CustomButton } from '@fe/shared';

export interface LeadingSectionContent {
  title: string;
  description: string;
  button: Button;
  img: Image;
}

@Component({
  selector: 'lib-leading-section',
  standalone: true,
  imports: [CustomButton],
  templateUrl: './leading-section.html',
  styleUrl: './leading-section.css',
})
export class LeadingSection {
  content = input<LeadingSectionContent | null>();
}
