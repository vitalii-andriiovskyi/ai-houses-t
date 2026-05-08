import { Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[linked-in]',
  imports: [],
  templateUrl: './linked-in.html',
  host: {
    '[attr.width]': 'width()',
    '[attr.height]': 'height()',
    '[attr.viewBox]': 'viewBox()',
    '[attr.fill]': 'fill()',
  },
})
export class LinkedIn {
  readonly viewBox = input<string>('0 0 17 17');
  readonly fill = input<string>('currentColor');
  readonly width = input<number>(17);
  readonly height = input<number>(17);
}
