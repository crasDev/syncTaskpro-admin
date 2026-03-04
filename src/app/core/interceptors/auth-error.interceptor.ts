import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError(error => {
      switch (error.status) {
        case 401:
          auth.logout({ logoutParams: { returnTo: window.location.origin + '/login' } });
          break;
        case 403:
          router.navigate(['/admin/unauthorized']);
          break;
        case 429:
          console.warn('Rate limited — too many requests');
          break;
        case 0:
          console.error('Connection lost — network error');
          break;
      }
      return throwError(() => error);
    })
  );
};
