import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  Meta,
  provideClientHydration,
  Title,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';

import { appRoutes } from './app.routes';
import CONFIG from '../config';

import { AiHousesTheme } from '@fe/styles';
import { APP_CONFIG_TOKEN, authInterceptor } from '@fe/shared';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG_TOKEN, useValue: CONFIG },
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: AiHousesTheme,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, components, primeng, utilities',
          },
        },
      },
    }),
    // provideImageKitLoader('https://ik.imagekit.io/ai-houses/'), // For now no image loader, if needed add one or custom one
    Title,
    Meta,
  ],
};
