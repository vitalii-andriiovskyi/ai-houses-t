import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '@fe/shared';
import { VehicleDetails, VehicleStore } from '@fe/vehicle';

@Component({
  selector: 'lib-vehicle-details-page',
  imports: [VehicleDetails],
  templateUrl: './vehicle-details-page.html',
  styleUrl: './vehicle-details-page.css',
})
export class VehicleDetailsPage {
  private seoService = inject(SeoService);
  vehicleService = inject(VehicleStore);
  private activatedRoute = inject(ActivatedRoute);

  data$ = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    distinctUntilChanged(),
    switchMap((id) => this.vehicleService.getEntityByURL(id)),
    tap(({ data }) => {
      if (data?.seo) {
        this.seoService.setPostSeoData(data.seo);
      }
    }),
  );
  data = toSignal(this.data$);
}
