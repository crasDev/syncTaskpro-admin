import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="shell">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <img
              src="assets/images/logo-full.png"
              alt="SyncTaskPro"
              class="logo-img"
            />
            <span class="logo-text">SyncTaskPro <span class="badge">Admin</span></span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </a>
          <div class="nav-section-title">MANAGE</div>
          <a routerLink="/admin/tenants" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Tenants</span>
          </a>
          <a routerLink="/admin/users" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Users</span>
          </a>
          <a routerLink="/admin/support" routerLinkActive="active" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>Support</span>
          </a>
        </nav>
      </aside>

      <div class="main-area">
        <header class="topbar">
          <div class="topbar-left">
            <span class="topbar-title">Super Admin Panel</span>
          </div>
          <div class="topbar-right">
            <div class="user-avatar">A</div>
          </div>
        </header>
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .sidebar {
      width: var(--sidebar-width);
      background: var(--color-bg-secondary);
      border-right: 1px solid var(--color-glass-border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid var(--color-glass-border);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-img {
      width: 36px;
      height: 36px;
      filter: drop-shadow(0 0 12px var(--color-accent-glow));
    }

    .logo-text {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .badge {
      font-size: 10px;
      font-weight: 600;
      background: var(--color-primary);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      vertical-align: middle;
      margin-left: 4px;
    }

    .sidebar-nav {
      padding: 12px;
      flex: 1;
      overflow-y: auto;
    }

    .nav-section-title {
      font-family: var(--font-display);
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-muted);
      letter-spacing: 0.05em;
      padding: 16px 12px 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--glass-radius-sm);
      color: var(--color-text-muted);
      text-decoration: none;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
      cursor: pointer;

      &:hover {
        background: var(--color-glass-bg);
        color: var(--color-text-primary);
      }

      &.active {
        background: var(--color-accent-glow);
        color: var(--color-primary);
      }
    }

    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .topbar {
      height: var(--topbar-height);
      border-bottom: 1px solid var(--color-glass-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      flex-shrink: 0;
    }

    .topbar-title {
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-muted);
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-muted);
      cursor: pointer;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }
  `],
})
export class AppShellComponent {}
