import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h2>Admin Dashboard</h2>
      <p class="subtitle">Platform overview</p>

      <div class="cards">
        <div class="stat-card">
          <div class="stat-label">Total Tenants</div>
          <div class="stat-value">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Active Users</div>
          <div class="stat-value">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Open Tickets</div>
          <div class="stat-value">--</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">System Health</div>
          <div class="stat-value health-ok">OK</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
    }

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

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .stat-card {
      background: var(--color-glass-bg);
      backdrop-filter: var(--blur-glass);
      -webkit-backdrop-filter: var(--blur-glass);
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-lg);
      padding: 24px;
    }

    .stat-label {
      font-size: 13px;
      color: var(--color-text-muted);
      font-weight: 500;
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .health-ok {
      color: var(--color-success);
    }
  `],
})
export class DashboardComponent {}
