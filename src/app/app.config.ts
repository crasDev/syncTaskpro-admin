import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { authErrorInterceptor } from './core/interceptors/auth-error.interceptor';

const env = (window as any).__env || {};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authHttpInterceptorFn, authErrorInterceptor])),
    provideAuth0({
      domain: env.AUTH0_DOMAIN || environment.auth0.domain,
      clientId: env.AUTH0_ADMIN_CLIENT_ID || environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: env.AUTH0_AUDIENCE || environment.auth0.audience,
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
