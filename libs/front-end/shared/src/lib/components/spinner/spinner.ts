import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  color = input<string>("white");
  width = input<number>(23);
  height = input<number>(23);
}
