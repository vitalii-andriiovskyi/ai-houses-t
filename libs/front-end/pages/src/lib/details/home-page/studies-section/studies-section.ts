import { Component, input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { Button } from '@shared';
import { Heading, CustomButton } from '@fe/shared';

interface CaseStudyItem {
  id: string;
  description: string;
  button: Button;
}

export interface StudiesSectionContent {
  title: string;
  description: string;
  items: CaseStudyItem[];
}

@Component({
  selector: 'lib-studies-section',
  standalone: true,
  imports: [Heading, CustomButton, CarouselModule],
  templateUrl: './studies-section.html',
  styleUrl: './studies-section.css',
})
export class StudiesSection {
  content = input<StudiesSectionContent | null>();

  readonly carouselOptions: OwlOptions = {
    items: 1,
    loop: true,
    margin: 20,
    dots: false,
    nav: false,
    autoWidth: true,
    // center: true, // with this it looks better, but not by design
    stagePadding: 20, // doesn't work with autoWidth, so we use margin instead
  };
}
