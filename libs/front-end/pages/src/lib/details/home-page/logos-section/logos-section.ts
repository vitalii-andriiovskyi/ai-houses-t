import { Component, input } from '@angular/core';

import { Image } from '@shared';

export interface LogosSectionContent {
  logos: {
    children: Image[];
  };
}

@Component({
  selector: 'lib-logos-section',
  standalone: true,
  imports: [],
  templateUrl: './logos-section.html',
  styleUrl: './logos-section.css',
})
export class LogosSection {
  content = input<LogosSectionContent | null>();
}
