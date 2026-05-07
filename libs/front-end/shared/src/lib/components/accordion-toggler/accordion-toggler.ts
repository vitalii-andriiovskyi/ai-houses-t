import { Component, input } from '@angular/core';
import { Minus } from '../svgs/minus/minus';
import { Plus } from '../svgs/plus/plus';

interface AccordionTogglerContent {
  ariaLabelOpen: string;
  ariaLabelClose: string;
}

const content: AccordionTogglerContent = {
  ariaLabelOpen: 'Open accordion section',
  ariaLabelClose: 'Close accordion section',
};

@Component({
  selector: 'lib-accordion-toggler',
  imports: [Plus, Minus],
  templateUrl: './accordion-toggler.html',
  styleUrl: './accordion-toggler.css',
})
export class AccordionToggler {
  readonly isOpen = input<boolean>(false);
  readonly content = input<AccordionTogglerContent>(content);
}
