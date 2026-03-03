import { Component } from '@angular/core';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `
    <div class="callback">
      <div class="spinner"></div>
      <p>Signing you in...</p>
    </div>
  `,
  styles: [`
    .callback {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top: 3px solid var(--color-accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    p {
      color: var(--color-text-muted);
      font-size: 14px;
    }
  `],
})
export class CallbackComponent {}
