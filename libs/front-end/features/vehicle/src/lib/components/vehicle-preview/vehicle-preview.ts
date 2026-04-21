import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleBasic } from '../../domain/vehicle.model';

@Component({
  selector: 'lib-vehicle-preview',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './vehicle-preview.html',
  styleUrl: './vehicle-preview.css',
})
export class VehiclePreview {
  data = input<VehicleBasic>();
}
