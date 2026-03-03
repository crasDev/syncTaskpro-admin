import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  standalone: true,
  template: `
    <div class="page">
      <h2>Support</h2>
      <p class="subtitle">Manage support tickets</p>
      <div class="placeholder-card">
        <p>Support ticket system coming soon</p>
      </div>
    </div>
  `,
  styles: [`
    .page { max-width: 1200px; }

    h2 {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .subtitle {
      color: var(--color-text-muted);
      font-family: var(--font-body);
      margin-top: 4px;
      margin-bottom: 32px;
    }

    .placeholder-card {
      background: var(--color-glass-bg);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--color-glass-border);
      border-radius: var(--glass-radius);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 var(--color-glass-highlight);
      padding: 48px;
      text-align: center;
      color: var(--color-text-muted);
      font-family: var(--font-body);
    }
  `],
})
export class SupportComponent {}
