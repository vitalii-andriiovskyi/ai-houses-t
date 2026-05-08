import { Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[star]',
  imports: [],
  templateUrl: './star.html',
  host: {
    '[attr.width]': 'width()',
    '[attr.height]': 'height()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
  },
})
export class Star {
  readonly viewBox = input<string>('0 0 14 14');
  readonly fill = input<string>('currentColor');
  readonly width = input<number>(14);
  readonly height = input<number>(14);
}
