import { Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[arrow-left]',
  imports: [],
  templateUrl: './arrow-left.html',
  host: {
    '[attr.width]': 'width()',
    '[attr.height]': 'height()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
  },
})
export class ArrowLeft {
  readonly viewBox = input<string>('0 0 23 23');
  readonly fill = input<string>('currentColor');
  readonly width = input<number>(23);
  readonly height = input<number>(23);
}
