import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="unauthorized">
      <div class="glass-card">
        <div class="icon">&#128683;</div>
        <h1>Access Denied</h1>
        <p>You are not authorized to access the admin console.</p>
        <p class="warning">This attempt has been recorded.</p>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-primary, #060B14);
    }

    .glass-card {
      text-align: center;
      padding: 56px 48px;
      max-width: 440px;
      background: rgba(10, 22, 40, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 45, 85, 0.4);
      border-radius: 16px;
      box-shadow: 0 0 60px rgba(255, 45, 85, 0.1);
    }

    .icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    h1 {
      font-family: var(--font-display, 'Sora', sans-serif);
      font-size: 28px;
      font-weight: 800;
      color: #FF2D55;
      margin: 0 0 16px;
    }

    p {
      color: var(--color-text-muted, #4A6FA5);
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 8px;
    }

    .warning {
      color: rgba(255, 45, 85, 0.8);
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 24px;
    }
  `],
})
export class UnauthorizedComponent {}
