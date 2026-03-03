import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
      { path: 'callback', loadComponent: () => import('./features/auth/callback.component').then(m => m.CallbackComponent) },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/layouts/app-shell.component').then(m => m.AppShellComponent),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'tenants', loadComponent: () => import('./features/tenants/tenants.component').then(m => m.TenantsComponent) },
      { path: 'users', loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent) },
      { path: 'support', loadComponent: () => import('./features/support/support.component').then(m => m.SupportComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];
