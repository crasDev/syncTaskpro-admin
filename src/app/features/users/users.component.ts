import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  template: `
    <div class="page">
      <h2>Users</h2>
      <p class="subtitle">Manage all platform users</p>
      <div class="placeholder-card">
        <p>User management coming soon</p>
      </div>
    </div>
  `,
  styles: [`
    .page { max-width: 1200px; }

    h2 {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .subtitle {
      color: var(--color-text-muted);
      margin-top: 4px;
      margin-bottom: 32px;
    }

    .placeholder-card {
      background: var(--color-glass-bg);
      backdrop-filter: var(--blur-glass);
      -webkit-backdrop-filter: var(--blur-glass);
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-lg);
      padding: 48px;
      text-align: center;
      color: var(--color-text-muted);
    }
  `],
})
export class UsersComponent {}
