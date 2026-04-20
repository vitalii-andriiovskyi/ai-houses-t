import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DataView,
  DataViewLazyLoadEvent,
  DataViewModule,
} from 'primeng/dataview';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ImageType, SEOBasic, Vehicle } from '@shared';
import { APP_CONFIG_TOKEN, CustomButton, SeoService } from '@fe/shared';
import { DataStore, RemoveItem } from '@ap/shared';

const URL = 'vehicles';

@Component({
  selector: 'lib-vehicle-index',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    DataViewModule,
    ToggleButtonModule,
    RemoveItem,
    CustomButton,
  ],
  templateUrl: './vehicle-index.html',
  styleUrl: './vehicle-index.css',
  providers: [DataStore],
})
export class VehicleIndex implements OnInit {
  seoData: SEOBasic = {
    id: 'vehicle-index',
    title: 'Vehicle Index - AI HOUSES',
    headline: 'Vehicle Index',
    description:
      'Browse and manage vehicles in the admin panel. Search, edit, and remove vehicle entries.',
    url: '',
    image: {
      id: 'vehicle-index-hero',
      src: '',
      alt: 'Vehicle Index',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private appConfig = inject(APP_CONFIG_TOKEN);
  domain = this.appConfig?.domain || '';
  private seoService = inject(SeoService);
  private dataStore = inject(DataStore<Vehicle>);
  data = this.dataStore.data;

  dv = viewChild<DataView>('dv');
  loading = signal(false);
  pageInitial = 1;
  protected page = signal(this.pageInitial);
  protected limit = 10;

  search = new FormControl('');

  constructor() {
    this.onSearch().subscribe();
  }

  ngOnInit() {
    this.seoService.setCommonPageSeoData(this.seoData);
  }

  onLoadData(event: DataViewLazyLoadEvent) {
    const page = event.first / event.rows + 1;
    this.loadData(page, event.rows, this.search.value);
  }

  loadData(page: number, limit: number, search = this.search.value) {
    this.loading.set(true);
    this.page.set(page);

    this.dataStore
      .load(URL, { page, limit, search })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }

  onSearch() {
    return this.search.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      tap(() => {
        const dv = this.dv();
        if (dv) {
          dv.paginate({
            page: this.pageInitial - 1,
            rows: this.limit,
            first: 0,
          });
        }
      }),
      takeUntilDestroyed(),
    );
  }

  removeItem(id: string) {
    const url = `${URL}/${id}`;
    this.dataStore
      .remove(url)
      .pipe(
        tap(() => {
          this.loadData(this.page(), this.limit);
        }),
      )
      .subscribe();
  }

  statusChange(event: any, item: Vehicle) {
    console.log('Status changed for item:', item, 'New status:', event.checked);
  }

  getRowIndex(i: number): number {
    return (this.page() - 1) * this.limit + i + 1;
  }
}
