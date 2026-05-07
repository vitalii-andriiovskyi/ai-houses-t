import { Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[minus]',
  imports: [],
  templateUrl: './minus.html',
  host: {
    '[attr.width]': 'width()',
    '[attr.height]': 'height()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
  },
})
export class Minus {
  readonly viewBox = input<string>('0 0 18 6');
  readonly fill = input<string>('currentColor');
  readonly width = input<number>(18);
  readonly height = input<number>(6);
}
