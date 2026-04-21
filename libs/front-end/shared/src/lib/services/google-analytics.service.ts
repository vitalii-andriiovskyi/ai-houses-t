import { inject, Injectable } from '@angular/core';
import { WINDOW } from './window-ref.service';

type Tracker = {
  send: (
    hitType: string,
    category?: string,
    action?: string,
    label?: string
  ) => void;
  set: (
    hitType: string,
    value: string
  ) => void;
};

declare const ga: {
  (...args: any[]): () => void;
  getAll: () => Tracker[];
};

const has = Object.prototype.hasOwnProperty;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private winRef = inject(WINDOW);

  logCustomEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel?: string
  ) {
    ga(() => {
      if (has.call(this.winRef, 'ga')) {
        const tracker = ga.getAll();
        if (tracker?.length > 0) {
          tracker[0]?.send('event', eventCategory, eventAction, eventLabel);
        }
      }
    });
  }

  logPageView(url: string) {
    ga(() => {
      if (has.call(this.winRef, 'ga')) {
        const tracker = ga.getAll();
        if (tracker?.length > 0) {
          tracker[0]?.set('page', url);
          tracker[0]?.send('pageview');
        }
      }
    });
  }
}
