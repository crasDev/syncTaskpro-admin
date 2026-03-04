import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';

export const adminAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    take(1),
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        auth.loginWithRedirect();
        return [false];
      }

      return auth.user$.pipe(
        take(1),
        map(user => {
          if (!user) {
            router.navigate(['/admin/unauthorized']);
            return false;
          }

          // Check 1: role claim contains super-admin
          const roles: string[] = user['https://synctaskpro.com/roles'] || [];
          const hasSuperAdminRole = roles.includes('super-admin');

          // Check 2: email in allowedAdminEmails list
          const allowedEmails = environment.allowedAdminEmails || [];
          const isAllowedEmail = allowedEmails.includes(user.email || '');

          if (!hasSuperAdminRole && !isAllowedEmail) {
            console.warn('Unauthorized admin access attempt:', user.email);
            auth.logout({ logoutParams: { returnTo: window.location.origin + '/admin/unauthorized' } });
            return false;
          }

          return true;
        })
      );
    })
  );
};
