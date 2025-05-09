import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
export const API_URL = new InjectionToken<string>('API_URL');
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    { provide: API_URL, useValue: 'https://localhost:7136/api' },
  ]
};
