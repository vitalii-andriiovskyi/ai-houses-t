import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '@fe/shared';
import { AiHouseDetails, AiHouseStore } from '@fe/ai-house';

@Component({
  selector: 'lib-ai-house-details-page',
  imports: [AiHouseDetails],
  templateUrl: './ai-house-details-page.html',
  styleUrl: './ai-house-details-page.css',
})
export class AiHouseDetailsPage {
  private seoService = inject(SeoService);
  aiHouseService = inject(AiHouseStore);
  private activatedRoute = inject(ActivatedRoute);

  data$ = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    distinctUntilChanged(),
    switchMap((id) => this.aiHouseService.getEntityByURL(id)),
    tap(({ data }) => {
      if (data?.seo) {
        this.seoService.setPostSeoData(data.seo);
      }
    }),
  );
  data = toSignal(this.data$);
}
