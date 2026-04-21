import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { Vehicle } from '../../domain/vehicle.model';
import { ActionStatus } from '@fe/shared';

@Component({
  selector: 'lib-vehicle-details',
  imports: [CommonModule],
  templateUrl: './vehicle-details.html',
  styleUrl: './vehicle-details.css',
})
export class VehicleDetails {
  data = input<ActionStatus<Vehicle> | null>();
}
