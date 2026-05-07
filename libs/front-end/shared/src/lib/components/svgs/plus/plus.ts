import { Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[plus]',
  imports: [],
  templateUrl: './plus.html',
  host: {
    '[attr.width]': 'width()',
    '[attr.height]': 'height()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
  },
})
export class Plus {
  readonly viewBox = input<string>('0 0 26 26');
  readonly fill = input<string>('currentColor');
  readonly width = input<number>(26);
  readonly height = input<number>(26);
}
