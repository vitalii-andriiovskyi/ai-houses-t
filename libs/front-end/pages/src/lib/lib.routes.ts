import { Route } from '@angular/router';

export const pagesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'ai-houses',
    loadComponent: () =>
      import('./pages/ai-houses-page/ai-houses-page').then(
        (m) => m.AiHousesPage,
      ),
  },
  {
    path: 'ai-houses/:id',
    loadComponent: () =>
      import('./pages/ai-house-details-page/ai-house-details-page').then(
        (m) => m.AiHouseDetailsPage,
      ),
  },
  // {
  //   path: '**',
  //   loadComponent: () =>
  //     import('./pages/page-not-found/page-not-found').then(
  //       (m) => m.PageNotFound,
  //     ),
  // },
];
