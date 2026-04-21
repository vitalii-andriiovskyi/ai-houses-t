import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs';
import {
  DataView,
  DataViewLazyLoadEvent,
  DataViewModule,
} from 'primeng/dataview';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AIHouse, ImageType, SEOBasic } from '@shared';
import { APP_CONFIG_TOKEN, SeoService, CustomButton } from '@fe/shared';
import { DataStore, RemoveItem } from '@ap/shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const URL = 'ai-houses';

@Component({
  selector: 'lib-ai-house-index',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    DataViewModule,
    ToggleButtonModule,
    RemoveItem,
    CustomButton,
  ],
  templateUrl: './ai-house-index.html',
  styleUrl: './ai-house-index.css',
  providers: [DataStore],
})
export class AiHouseIndex implements OnInit {
  seoData: SEOBasic = {
    id: 'ai-house-index',
    title: 'AI House Index - AI HOUSES',
    headline: 'AI House Index',
    description:
      'Browse and manage the AI House index. View, edit, and organize AI-generated house entries.',
    url: '',
    image: {
      id: 'ai-house-index-hero',
      src: '',
      alt: 'AI House Index',
      type: ImageType.HeroImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  private appConfig = inject(APP_CONFIG_TOKEN);
  domain = this.appConfig?.domain || '';
  private seoService = inject(SeoService);
  private dataStore = inject(DataStore<AIHouse>);
  data = this.dataStore.data;

  dv = viewChild<DataView>('dv');
  loading = signal(false);
  pageInitial = 1;
  protected page = signal(this.pageInitial);
  protected limit = 10; // not sure do I need it to be signal

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
    // this.limit = limit;

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
        // don't need the line below as dv.paginate triggers onLazyLoad event at the end of pagination even if the first and rows are the same.
        // this.loadData(this.pageInitial, this.limit, value);
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

  statusChange(event: any, item: AIHouse) {
    // Implement the logic to change the status of the item
    // For example, you can call a method in the data store to update the item's status and then refresh the list
    console.log('Status changed for item:', item, 'New status:', event.checked);
  }

  getRowIndex(i: number): number {
    return (this.page() - 1) * this.limit + i + 1;
  }
}
