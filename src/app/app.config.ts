import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { authErrorInterceptor } from './core/interceptors/auth-error.interceptor';

const env = window.__env || {};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authErrorInterceptor])),
    provideAuth0({
      domain: env.AUTH0_DOMAIN || environment.auth0.domain,
      clientId: env.AUTH0_ADMIN_CLIENT_ID || environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        scope: 'openid profile email',
      },
      cacheLocation: 'memory',
      httpInterceptor: {
        allowedList: [
          {
            uri: `${env.API_URL || environment.apiUrl}/*`,
            allowAnonymous: false,
          },
        ],
      },
    }),
  ],
};
