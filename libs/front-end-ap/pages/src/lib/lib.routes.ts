import { Route } from '@angular/router';

import { adminGuard } from '@ap/shared';

export const pagesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then((m) => m.HomePage),
    canActivate: [adminGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in').then((m) => m.SignInPage),
  },
  {
    path: 'pages',
    children: [
      {
        path: 'landing',
        loadComponent: () =>
          import('./pages/landing/landing').then((m) => m.LandingPage),
      },
    ],
    canActivate: [adminGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found').then(
        (m) => m.PageNotFound,
      ),
  },
];
