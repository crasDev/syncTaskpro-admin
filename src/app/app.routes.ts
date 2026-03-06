import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { adminAuthGuard } from './core/auth/admin-auth.guard';

export const routes: Routes = [
  // Auth routes
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'callback',
    loadComponent: () => import('./features/auth/callback.component').then(m => m.CallbackComponent),
  },
  {
    path: 'admin/unauthorized',
    loadComponent: () => import('./features/auth/unauthorized.component').then(m => m.UnauthorizedComponent),
  },
  // Authenticated admin routes — double guard (auth + admin role)
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/layouts/app-shell.component').then(m => m.AppShellComponent),
    canActivate: [authGuard, adminAuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'companies', loadComponent: () => import('./features/companies/company-list/company-list.component').then(m => m.CompanyListComponent) },
      { path: 'companies/:id', loadComponent: () => import('./features/companies/company-detail/company-detail.component').then(m => m.CompanyDetailComponent) },
      { path: 'users', loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent) },
      { path: 'support', loadComponent: () => import('./features/support/support.component').then(m => m.SupportComponent) },
      { path: 'audit', loadComponent: () => import('./features/audit/audit-log.component').then(m => m.AuditLogComponent) },
      { path: 'translations', loadComponent: () => import('./features/translations/translations.component').then(m => m.TranslationsComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
