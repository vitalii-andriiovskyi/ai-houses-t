import { Route } from '@angular/router';
import { App } from './app';

export const appRoutes: Route[] = [
  {
    path: '',
    component: App
  },
  {
    path: 'ai-houses',
    loadComponent: () => import('@ai-house').then((m) => m.AiHouses),
  },
  {
    path: 'ai-houses/:id',
    loadComponent: () => import('@ai-house').then((m) => m.AiHouseDetails),
  }
];
