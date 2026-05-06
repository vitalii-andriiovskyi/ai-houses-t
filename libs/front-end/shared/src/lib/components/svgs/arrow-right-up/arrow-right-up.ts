import { Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[arrow-right-up]',
  imports: [],
  templateUrl: './arrow-right-up.html',
  host: {
    '[attr.width]': 'width()',
    '[attr.height]': 'height()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
  },
})
export class ArrowRightUp {
  readonly viewBox = input<string>('0 0 21 20');
  readonly fill = input<string>('currentColor');
  readonly width = input<number>(21);
  readonly height = input<number>(20);
}
