import { inject, Injectable } from '@angular/core';

import { VehicleService } from '../infrastructure/vehicle.service';
import { VehicleBasic, Vehicle as VehicleModel } from './vehicle.model';
import { BasicStore } from '@fe/shared';

@Injectable({ providedIn: 'root' })
export class VehicleStore extends BasicStore<VehicleBasic, VehicleModel> {
  primaryIdKey = 'id';
  protected _apiService = inject(VehicleService);
}
